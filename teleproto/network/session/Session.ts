import bigInt from "big-integer";
import { setTimeout as sleep } from "node:timers/promises";
import { AuthKey } from "../../crypto/AuthKey";
import { Api } from "../../tl";
import { LAYER } from "../../tl/runtime/Registry";
import type { Logger } from "../../extensions/Logger";
import Deferred from "../../extensions/Deferred";
import { ProxyRejectedError, RPCError, TypeNotFoundError } from "../../errors";
import type { TelegramClient } from "../../client/TelegramClient";
import type { Connection } from "../connection/Connection";
import type { DcState } from "../dc/DcState";
import { doAuthentication } from "../mtproto/authKeyExchange";
import { PlainSender } from "../mtproto/PlainSender";
import { DuplicateMessageError, InvalidAuthKeyError, SessionState } from "../mtproto/SessionState";
import { PendingRequests } from "../mtproto/PendingRequests";
import { MessageRouter, type RouterHost } from "../mtproto/MessageRouter";
import { RequestState, expectsAnswer } from "../mtproto/RequestState";
import { isContentRelated, packMessages } from "../mtproto/containerPacker";
import { SaltPool } from "../mtproto/SaltPool";
import { buildBindTempAuthKeyRequest } from "../mtproto/tempKeyBinding";
import { RequestQueue } from "./RequestQueue";
import { SessionLink, type LinkClose, type LinkHost, type OutgoingPacket } from "./SessionLink";
import { ConnectThrottle } from "./ConnectThrottle";
import { UpdateConnectionState } from "./UpdateConnectionState";

const DEFAULT_CONNECT_TIMEOUT_S = 10;
const SEND_BYTES_PER_SECOND = 8192;
const SEND_SILENCE_CAP_MS = 64_000;
const ACTIVITY_WINDOW_MS = 10_000;
const ACK_DELAY_MS = 30_000;
const MAX_PENDING_ACKS = 100;
const STUCK_QUERY_S = 60;
const MAX_IDS_PER_MESSAGE = 8192;
const TEMP_KEY_REFRESH_MARGIN_S = 3600;

export type ConnectionBreakReason = "disconnected" | "rekey" | "auth-broken";

export type SenderLifecycle = "disconnected" | "connecting" | "connected" | "reconnecting" | "dead";

export type LifecycleEvent = "connecting" | "connect" | "disconnect" | "reconnecting";

export interface SenderTempBinding {
    permAuthKey: AuthKey;
    dcParam: number;
    expiresIn: number;
    onFailed: (error: unknown) => void;
}

export interface SessionOptions {
    logger: Logger;
    dcId: number;
    client: TelegramClient;
    isMainSender: boolean;
    retries?: number;
    reconnectRetries?: number;
    autoReconnect?: boolean;
    connectTimeout?: number | null;
    securityChecks?: boolean;
    dcenter?: DcState;
    tempBinding?: SenderTempBinding;
    throttle?: ConnectThrottle;
    nextConnection?: () => Connection;
    authKeyCallback?: (authKey: AuthKey | undefined, dcId: number) => Promise<void> | void;
    updateCallback?: (client: TelegramClient, update: UpdateConnectionState | Api.TypeUpdates) => void;
    autoReconnectCallback?: () => Promise<void> | void;
    lifecycleCallback?: (event: LifecycleEvent) => void;
    onConnectionBreak?: (dcId: number, reason?: ConnectionBreakReason) => void;
}

interface Run {
    readonly abort: AbortController;
    readonly ready: Deferred<void>;
}

interface TempKey {
    expiresAt: number;
    bound: boolean;
}

class SessionStopped extends Error {
    constructor(
        readonly cause: Error,
        readonly reason: ConnectionBreakReason,
        readonly broken: boolean
    ) {
        super(cause.message);
    }
}

export class Session implements LinkHost, RouterHost {
    readonly authKey: AuthKey;
    readonly state: SessionState;
    readonly pending = new PendingRequests();
    readonly log: Logger;
    readonly isMain: boolean;
    _needsInitConnection = true;
    _updateCallback?: SessionOptions["updateCallback"];

    private readonly opts: SessionOptions;
    private readonly queue = new RequestQueue();
    private readonly router: MessageRouter;
    private readonly ownSalts = new SaltPool();
    private readonly throttle: ConnectThrottle;
    private readonly acks: bigInt.BigInteger[] = [];
    private readonly probes = new Map<RequestState, bigInt.BigInteger[]>();
    dcId: number;
    private status: SenderLifecycle = "disconnected";
    private run?: Run;
    private link?: SessionLink;
    private connection?: Connection;
    private tempKey?: TempKey;
    private failures = 0;
    private keyRejections = 0;
    private firstAckAt = 0;
    private rtt = 0;
    private jitter = 0;
    private online = false;
    private lastActivityAt = 0;

    constructor(authKey: AuthKey | undefined, opts: SessionOptions) {
        this.opts = opts;
        this.log = opts.logger;
        this.dcId = opts.dcId;
        this.isMain = opts.isMainSender;
        this._updateCallback = opts.updateCallback;
        this.throttle = opts.throttle ?? new ConnectThrottle();
        this.authKey = authKey ?? new AuthKey();
        this.state = new SessionState(this.authKey, this.log, opts.securityChecks ?? true);
        this.router = new MessageRouter(this);
    }

    get lifecycle(): SenderLifecycle {
        return this.status;
    }

    isConnected() {
        return this.status === "connected";
    }

    get isConnecting() {
        return this.status === "connecting";
    }

    get isReconnecting() {
        return this.status === "reconnecting";
    }

    get userDisconnected() {
        return this.status === "dead";
    }

    get _disconnected() {
        return this.status !== "connected";
    }

    get hasPendingWork() {
        return this.queue.requests.length > 0 || this.pending.size > 0;
    }

    get lastReadAt() {
        return this.link?.lastReadAt ?? 0;
    }

    async connect(connection: Connection, force = false): Promise<boolean> {
        if (this.status === "connected" && !force) return false;
        if (this.run && !force) {
            await this.run.ready.promise;
            return true;
        }
        this.endRun();
        this.connection = connection;
        const run: Run = { abort: new AbortController(), ready: new Deferred<void>() };
        run.ready.promise.catch(() => {});
        this.run = run;
        void this.supervise(run, connection);
        await run.ready.promise;
        return true;
    }

    async disconnect() {
        const wasLive = this.status !== "dead";
        this.status = "dead";
        this.endRun();
        const link = this.link;
        this.link = undefined;
        link?.close("restart");
        await this.connection?.disconnect().catch(() => {});
        if (wasLive) this.announce("disconnect");
        this.failAll(new Error(`Disconnected from dc ${this.dcId}`));
    }

    reconnect() {
        this.link?.close("restart");
    }

    send<R extends Api.AnyRequest>(request: R): Promise<R["__response"]> {
        const state = new RequestState<R["__response"]>(request);
        this.addStateToQueue(state as RequestState);
        return state.promise;
    }

    addStateToQueue(state: RequestState) {
        if (state.cancelled) return;
        if (this.status === "dead") {
            state.reject(new Error(`Cannot send ${state.request.className}: sender for dc ${this.dcId} is disconnected`));
            return;
        }
        this.lastActivityAt = Date.now();
        this.queue.push(state);
    }

    cancelRequest(state: RequestState, reason: unknown) {
        state.cancelled = true;
        this.queue.remove(state);
        if (state.msgId && this.pending.take(state.msgId)) {
            this.queue.pushService(new RequestState(new Api.RpcDropAnswer({ reqMsgId: state.msgId })));
        }
        state.reject(reason);
        state.finished.resolve();
    }

    private async supervise(run: Run, connection: Connection) {
        const signal = run.abort.signal;
        let established = false;
        this.setStatus("connecting");
        while (!signal.aborted) {
            const attemptAt = this.throttle.nextAttemptAt();
            if (attemptAt > Date.now() && !(await this.wait(attemptAt - Date.now(), signal))) return;
            this.throttle.attempt();
            let link: SessionLink;
            try {
                link = await this.open(connection, signal);
            } catch (error) {
                if (signal.aborted) return;
                if (error instanceof SessionStopped) return this.stop(error.cause, error.reason, error.broken);
                const failure = error instanceof Error ? error : new Error(String(error));
                this.failures++;
                const limit = established ? this.opts.reconnectRetries ?? Infinity : this.opts.retries ?? Infinity;
                if (error instanceof ProxyRejectedError || this.failures > limit) {
                    return this.stop(failure, "disconnected", established);
                }
                this.log.warn(`Connection to dc ${this.dcId} via ${connection} failed (attempt ${this.failures}): ${failure.message}`);
                if (!established) {
                    if (this.failures === 1) this.announceState(UpdateConnectionState.disconnected);
                    await this.opts.client._errorHandler?.(failure);
                }
                connection = this.opts.nextConnection?.() ?? connection.clone();
                this.connection = connection;
                continue;
            }

            this.throttle.connected();
            this.link = link;
            this.log.debug(`Session for dc ${this.dcId} is up via ${connection}`);
            this.setStatus("connected");
            this.announce("connect");
            if (established) {
                this.probeUnanswered();
                void Promise.resolve(this.opts.autoReconnectCallback?.()).catch((error) =>
                    this.log.error(`Reconnect handler failed for dc ${this.dcId}`, error)
                );
            } else {
                run.ready.resolve();
            }
            established = true;

            const closed = await link.closed;
            if (this.link === link) this.link = undefined;
            this.dropServiceRequests(closed);
            if (signal.aborted) return;
            this.log.info(`Connection to dc ${this.dcId} closed (${closed.reason}${closed.error ? `: ${closed.error}` : ""})`);
            this.announce("disconnect");
            if (closed.reason === "flood") this.throttle.transportFlooded();
            const next = await this.afterClose(closed, connection);
            if (!next || signal.aborted) return;
            if (!(this.opts.autoReconnect ?? true)) {
                return this.stop(new Error(`Connection to dc ${this.dcId} was lost`), "disconnected", false);
            }
            this.failures++;
            if (this.failures > (this.opts.reconnectRetries ?? Infinity)) {
                return this.stop(new Error("Maximum reconnection retries reached. Aborting!"), "disconnected", true);
            }
            this.setStatus("reconnecting");
            connection = next.rotate && this.opts.nextConnection ? this.opts.nextConnection() : connection.clone();
            this.connection = connection;
        }
    }

    private dropServiceRequests(closed: LinkClose) {
        const error = new Error(`Connection to dc ${this.dcId} closed (${closed.reason})`);
        for (const state of this.pending.values()) {
            if (!this.queue.isService(state)) continue;
            this.pending.delete(state.msgId!);
            state.reject(error);
        }
        this.probes.clear();
    }

    private async open(connection: Connection, signal: AbortSignal): Promise<SessionLink> {
        await this.dial(connection);
        let link: SessionLink | undefined;
        try {
            if (signal.aborted) throw new Error("Connection attempt cancelled");
            await this.ensureKey(connection);
            if (signal.aborted) throw new Error("Connection attempt cancelled");
            if (this.state.salt.isZero() && !this.opts.tempBinding && this.opts.dcenter && !this.opts.dcenter.salt.isZero()) {
                this.state.salt = this.opts.dcenter.salt;
            }
            link = new SessionLink(connection, this, !!this.opts.tempBinding && !this.tempKey?.bound);
            this.link = link;
            this.jitter = Math.random() * 5;
            this.setOnline(link, this.wantsOnline(Date.now()), Date.now());
            link.start();
            if (link.gated) await this.bind(link);
            return link;
        } catch (error) {
            link?.close("restart");
            await connection.disconnect().catch(() => {});
            throw error;
        }
    }

    private async dial(connection: Connection) {
        const timeout = this.opts.connectTimeout;
        const seconds = typeof timeout === "number" && timeout > 0 ? timeout : DEFAULT_CONNECT_TIMEOUT_S;
        const dial = connection.connect();
        dial.catch(() => {});
        let timer: ReturnType<typeof setTimeout> | undefined;
        try {
            await Promise.race([
                dial,
                new Promise<never>((_, reject) => {
                    timer = setTimeout(
                        () => reject(new Error(`Connection to ${connection} timed out after ${seconds}s`)),
                        seconds * 1000
                    );
                }),
            ]);
        } catch (error) {
            await connection.disconnect().catch(() => {});
            throw error;
        } finally {
            clearTimeout(timer);
        }
    }

    private serverNow() {
        return Date.now() / 1000 + this.state.timeOffset;
    }

    private async ensureKey(connection: Connection) {
        const temp = this.opts.tempBinding;
        if (temp && this.authKey.getKey()) {
            const usable = this.tempKey?.bound && this.serverNow() < this.tempKey.expiresAt - TEMP_KEY_REFRESH_MARGIN_S;
            if (!usable) {
                this.tempKey = undefined;
                await this.authKey.setKey(undefined);
            }
        }
        if (this.authKey.getKey()) return;
        this.log.debug(`Creating ${temp ? "a temporary" : "an"} auth key for dc ${this.dcId}`);
        const result = await doAuthentication(
            new PlainSender(connection, this.log),
            this.log,
            temp ? { expiresIn: temp.expiresIn, dc: temp.dcParam } : undefined
        );
        await this.authKey.setKey(result.authKey);
        this.state.timeOffset = result.timeOffset;
        this.restartSession();
        this.state.salt = result.serverSalt;
        if (temp) {
            this.tempKey = { expiresAt: Math.floor(this.serverNow()) + temp.expiresIn, bound: false };
        } else {
            await this.opts.authKeyCallback?.(this.authKey, this.dcId);
        }
    }

    private async bind(link: SessionLink) {
        const temp = this.opts.tempBinding!;
        const msgId = this.state.newMsgId();
        const request = new RequestState(
            buildBindTempAuthKeyRequest(temp.permAuthKey, this.authKey, this.state.sessionId, msgId, this.tempKey!.expiresAt)
        );
        request.forcedMsgId = msgId;
        this.queue.pushService(request);
        let answer: unknown;
        try {
            answer = await Promise.race([
                request.promise,
                link.closed.then((closed) => {
                    throw new Error(`Connection closed while binding the temporary key (${closed.reason})`);
                }),
            ]);
        } catch (error) {
            if (request.msgId) this.pending.delete(request.msgId);
            if (link.isClosed) throw error;
            temp.onFailed(error);
            throw new SessionStopped(error instanceof Error ? error : new Error(String(error)), "rekey", false);
        }
        if (answer !== true) {
            const error = new Error(`bindTempAuthKey answered ${answer}`);
            temp.onFailed(error);
            throw new SessionStopped(error, "rekey", false);
        }
        this.tempKey!.bound = true;
        this._needsInitConnection = true;
        this.log.debug(`Bound temporary key for dc ${this.dcId}`);
        link.open();
    }

    private async afterClose(closed: LinkClose, connection: Connection): Promise<{ rotate: boolean } | undefined> {
        switch (closed.reason) {
            case "bad-key":
                return this.onBadKey(connection);
            case "flood":
                this.log.warn(`dc ${this.dcId} refused the connection: too many connections from this address`);
                return { rotate: false };
            case "restart":
                return { rotate: false };
            default:
                return { rotate: this.failures > 0 };
        }
    }

    private async onBadKey(connection: Connection): Promise<{ rotate: boolean } | undefined> {
        if (this.opts.tempBinding) {
            this.log.info(`Temporary key for dc ${this.dcId} is unknown to the server, creating a new one`);
            this.tempKey = undefined;
            return { rotate: false };
        }
        if (this.keyRejections++ === 0) {
            this.log.info(`dc ${this.dcId} did not recognise the auth key, retrying on a fresh session`);
            this.restartSession();
            return { rotate: false };
        }
        if (!this.isMain) {
            this.stop(new Error(`Authorization key for dc ${this.dcId} was rejected by the server`), "auth-broken", false);
            return undefined;
        }
        const valid = await this.opts.client._validateAuthKey(this.dcId, this.authKey, connection);
        if (valid !== false) {
            this.log.info(`dc ${this.dcId} confirmed the auth key, keeping it`);
            this.keyRejections = 0;
            this.restartSession();
            return { rotate: false };
        }
        this.log.warn(`dc ${this.dcId} does not know the auth key, dropping it`);
        this.announceState(UpdateConnectionState.broken);
        await this.authKey.setKey(undefined);
        await Promise.resolve(this.opts.authKeyCallback?.(undefined, this.dcId)).catch(() => {});
        return { rotate: false };
    }

    private stop(error: Error, reason: ConnectionBreakReason, broken: boolean) {
        const wasDead = this.status === "dead";
        const run = this.run;
        this.status = "dead";
        this.endRun();
        const link = this.link;
        this.link = undefined;
        link?.close("restart");
        this.connection?.disconnect().catch(() => {});
        if (broken) this.announceState(UpdateConnectionState.broken);
        if (!this.isMain && !wasDead) this.opts.onConnectionBreak?.(this.dcId, reason);
        this.failAll(error);
        run?.ready.reject(error);
    }

    private endRun() {
        const run = this.run;
        this.run = undefined;
        run?.abort.abort();
        run?.ready.reject(new Error("Connection attempt cancelled"));
    }

    private async wait(ms: number, signal: AbortSignal): Promise<boolean> {
        if (ms <= 0) return !signal.aborted;
        try {
            await sleep(ms, undefined, { signal });
            return true;
        } catch {
            return false;
        }
    }

    private setStatus(status: SenderLifecycle) {
        this.status = status;
        if (status === "connecting" || status === "reconnecting") this.opts.lifecycleCallback?.(status);
    }

    private announce(event: "connect" | "disconnect") {
        this.opts.lifecycleCallback?.(event);
        this.announceState(event === "connect" ? UpdateConnectionState.connected : UpdateConnectionState.disconnected);
    }

    private announceState(state: number) {
        this._updateCallback?.(this.opts.client, new UpdateConnectionState(state));
    }

    private failAll(error: Error) {
        for (const state of this.pending.values()) state.reject(error);
        this.pending.clear();
        this.queue.rejectAll(error);
        this.probes.clear();
        this.acks.length = 0;
    }

    restartSession() {
        this.state.reset();
        this.router.reset();
        this.acks.length = 0;
        this.probes.clear();
        this._needsInitConnection = true;
        const resend: RequestState[] = [];
        for (const state of this.pending.values()) {
            if (this.queue.isService(state)) state.reject(new Error(`Session for dc ${this.dcId} was reset`));
            else resend.push(state);
        }
        this.pending.clear();
        this.queue.requeue(resend);
    }

    async nextPacket(link: SessionLink): Promise<OutgoingPacket | undefined> {
        while (!link.isClosed) {
            if (!link.gated) this.refreshSalt();
            const hasWork = this.queue.service.length > 0 || (!link.gated && this.queue.requests.length > 0);
            if (this.acks.length && (hasWork || this.acksDue(Date.now()))) this.flushAcks();
            if (hasWork && !link.gated && this.mayPing(link, Date.now())) this.sendPing(link);
            if (!this.queue.next(!link.gated)) {
                await this.queue.waitForWork();
                continue;
            }
            if (!link.gated) this.wrapInitConnection();
            const packed = await packMessages(this.state, link.gated ? [this.queue.service] : [this.queue.service, this.queue.requests]);
            if (!packed) continue;
            let data: Buffer;
            try {
                data = await this.state.encryptMessageData(packed.data, link.connection.usesRandomPadding);
            } catch (error) {
                this.queue.requeue(packed.batch);
                link.close("lost", error);
                return undefined;
            }
            if (link.isClosed) {
                this.queue.requeue(packed.batch);
                return undefined;
            }
            this.log.debug(`Sending ${packed.batch.map((state) => state.request.className).join(",")} to dc ${this.dcId}`);
            return { batch: packed.batch, data };
        }
        return undefined;
    }

    onSent(link: SessionLink, packet: OutgoingPacket) {
        const sentAt = Date.now();
        let expectsReply = false;
        for (const state of packet.batch) {
            state.sentAt = sentAt;
            if (!state.cancelled && expectsAnswer(state.request)) {
                this.pending.add(state);
                expectsReply = true;
            }
        }
        if (expectsReply) {
            link.expectReplyBy(sentAt + Math.min(SEND_SILENCE_CAP_MS, (packet.data.length / SEND_BYTES_PER_SECOND) * 1000));
        }
    }

    onSendFailed(packet: OutgoingPacket) {
        this.queue.requeue(packet.batch);
    }

    async receive(link: SessionLink, body: Buffer) {
        let message;
        try {
            message = await this.state.decryptMessageData(body);
        } catch (error) {
            if (error instanceof DuplicateMessageError) return this.ack(error.msgId);
            if (error instanceof InvalidAuthKeyError) return link.close("bad-key", error);
            if (error instanceof TypeNotFoundError) return this.onUnknownType(error);
            this.log.warn(`Dropped a packet from dc ${this.dcId}: ${error}`);
            return;
        }
        link.lastPongAt = Date.now();
        this.failures = 0;
        this.keyRejections = 0;
        if (this.isMain) this.opts.client._lastReceivedAt = Date.now();
        try {
            this.router.route(message);
        } catch (error) {
            if (error instanceof TypeNotFoundError) return this.onUnknownType(error);
            if (error instanceof RPCError) return;
            this.log.error(`Failed to handle a message from dc ${this.dcId}`, error);
            await this.opts.client._errorHandler?.(error as Error);
        }
    }

    private hasQueries() {
        return this.queue.requests.length > 0 || this.pending.values().some((state) => !this.queue.isService(state));
    }

    private wantsOnline(now: number) {
        return this.hasQueries() || now - this.lastActivityAt < ACTIVITY_WINDOW_MS;
    }

    private setOnline(link: SessionLink, online: boolean, now: number) {
        const needPing = online || !this.online;
        this.online = online;
        const timers = this.timers(now);
        if (needPing) {
            link.lastPongAt = now - (timers.pingDisconnect - timers.rtt) * 1000;
            link.markRead(now - (timers.readDisconnect - timers.rtt) * 1000);
        } else {
            link.lastPongAt = now;
            link.markRead(now);
        }
        link.lastPingAt = 0;
    }

    private timers(_now: number) {
        const online = this.online;
        const rtt = Math.max(2, this.rtt * 1.5 + 1);
        const offline = 135 + this.jitter;
        return {
            rtt,
            readDisconnect: online ? rtt * 3.5 : offline,
            pingDisconnect: online && this.isMain ? rtt * 2.5 : offline,
            pingMay: online ? rtt * 0.5 : 30 + this.jitter,
            pingMust: online ? rtt : 60 + this.jitter,
        };
    }

    private mayPing(link: SessionLink, now: number) {
        return link.lastPingAt === 0 || now - link.lastPingAt > this.timers(now).pingMay * 1000;
    }

    tick(link: SessionLink, now: number) {
        if (this.tempKey?.bound && this.serverNow() >= this.tempKey.expiresAt - TEMP_KEY_REFRESH_MARGIN_S) {
            this.log.info(`Temporary key for dc ${this.dcId} is about to expire, renewing it`);
            return link.close("restart");
        }
        const online = this.wantsOnline(now);
        if (online !== this.online) this.setOnline(link, online, now);
        const timers = this.timers(now);
        const grace = link.quietUntil;
        if (now > Math.max(link.lastPongAt + timers.pingDisconnect * 1000, grace)) {
            return link.close("lost", new Error(`Ping timeout of ${timers.pingDisconnect.toFixed(1)}s expired`));
        }
        if (now > Math.max(link.lastReadAt + timers.readDisconnect * 1000, grace)) {
            return link.close("lost", new Error(`Read timeout of ${timers.readDisconnect.toFixed(1)}s expired`));
        }
        if (this.isMain && now - link.connectedAt > STUCK_QUERY_S * 1000) {
            const stuckBefore = now - (STUCK_QUERY_S + timers.rtt) * 1000;
            if (this.pending.values().some((state) => !this.queue.isService(state) && (state.sentAt ?? now) < stuckBefore)) {
                return link.close("lost", new Error(`A request to dc ${this.dcId} got no answer for ${STUCK_QUERY_S}s`));
            }
        }
        if (!link.gated && (link.lastPingAt === 0 || now - link.lastPingAt > timers.pingMust * 1000)) this.sendPing(link);
        if (this.acks.length && this.acksDue(now)) this.queue.notify();
    }

    wake() {
        this.queue.notify();
    }

    ack(msgId: bigInt.BigInteger) {
        if (!this.acks.length) this.firstAckAt = Date.now();
        this.acks.push(msgId);
        if (this.acks.length >= MAX_PENDING_ACKS) this.queue.notify();
    }

    private acksDue(now: number) {
        return this.acks.length >= MAX_PENDING_ACKS || now - this.firstAckAt >= ACK_DELAY_MS;
    }

    private flushAcks() {
        const msgIds = this.acks.splice(0, MAX_IDS_PER_MESSAGE);
        this.queue.pushService(new RequestState(new Api.MsgsAck({ msgIds })));
        if (this.acks.length) this.firstAckAt = Date.now();
    }

    sendService(request: Api.MsgsStateInfo | Api.MsgResendReq) {
        this.queue.pushService(new RequestState(request));
    }

    requeue(states: RequestState[]) {
        this.queue.requeue(states);
    }

    resendBefore(firstMsgId: bigInt.BigInteger) {
        const stale = this.pending
            .values()
            .filter((state) => !this.queue.isService(state) && (state.containerId ?? state.msgId)!.lesser(firstMsgId));
        if (!stale.length) return;
        for (const state of stale) this.pending.delete(state.msgId!);
        this.log.info(`Resending ${stale.length} request(s) on dc ${this.dcId} after the server started a new session`);
        this.queue.requeue(stale);
    }

    private get saltPool(): SaltPool {
        return this.opts.tempBinding || !this.opts.dcenter ? this.ownSalts : this.opts.dcenter.salts;
    }

    setSalt(salt: bigInt.BigInteger) {
        this.state.salt = salt;
        if (!this.opts.tempBinding) this.opts.dcenter?.updateSalt(salt);
    }

    badSalt(salt: bigInt.BigInteger) {
        this.saltPool.clear();
        this.setSalt(salt);
    }

    private refreshSalt() {
        const pool = this.saltPool;
        const salt = pool.current(this.serverNow());
        if (salt && !salt.equals(this.state.salt)) this.setSalt(salt);
        if (!pool.needsRefill()) return;
        pool.beginRefill();
        const request = new RequestState<Api.FutureSalts>(new Api.GetFutureSalts({ num: 64 }));
        request.promise.then(
            (result) => {
                pool.endRefill(result);
                this.log.debug(`Received ${pool.count} future salts for dc ${this.dcId}`);
            },
            () => pool.endRefill()
        );
        this.queue.pushService(request as RequestState);
    }

    requireInit() {
        this._needsInitConnection = true;
    }

    initAnswered() {
        this._needsInitConnection = false;
    }

    authLost(error: RPCError) {
        if (this.isMain) return;
        this.log.info(`Authorization is not imported on dc ${this.dcId} (${error.errorMessage}), re-importing`);
        this.stop(new Error(`Authorization for dc ${this.dcId} was not imported`), "rekey", false);
    }

    tempKeyRejected() {
        if (!this.opts.tempBinding) return;
        this.tempKey = undefined;
        this.link?.close("restart");
    }

    stateInfo(reqMsgId: bigInt.BigInteger, info: Buffer) {
        let ids: bigInt.BigInteger[] | undefined;
        for (const [probe, probed] of this.probes) {
            if (probe.msgId?.equals(reqMsgId)) {
                ids = probed;
                this.probes.delete(probe);
                break;
            }
        }
        if (!ids) return;
        const resend: RequestState[] = [];
        ids.forEach((id, index) => {
            const status = (info[index] ?? 0) & 7;
            if (status < 1 || status > 3) return;
            const state = this.pending.get(id);
            if (!state || this.queue.isService(state)) return;
            this.pending.delete(id);
            resend.push(state);
        });
        if (!resend.length) return;
        this.log.info(`Resending ${resend.length} request(s) dc ${this.dcId} never received`);
        this.queue.requeue(resend);
    }

    update(update: Api.TypeUpdates) {
        this._updateCallback?.(this.opts.client, update);
    }

    private onUnknownType(error: TypeNotFoundError) {
        if (this.isMain) void this.opts.client.updateManager.catchUp();
        this.log.info(`Skipping unknown constructor ${error.invalidConstructorId} from dc ${this.dcId}`);
    }

    private wrapInitConnection() {
        if (!this._needsInitConnection) return;
        for (const state of this.queue.requests) {
            if (state.cancelled || state.initWrapped) continue;
            if (!isContentRelated(state.request) || state.request instanceof Api.InvokeWithLayer) continue;
            state.request = new Api.InvokeWithLayer({
                layer: LAYER,
                query: this.opts.client._buildInitConnection(state.request as Api.AnyRequest),
            });
            state.data = state.request.getBytes();
            state.initWrapped = true;
        }
    }

    private sendPing(link: SessionLink) {
        const sentAt = Date.now();
        link.lastPingAt = sentAt;
        const ping = new RequestState(
            new Api.PingDelayDisconnect({
                pingId: bigInt.randBetween("-9223372036854775808", "9223372036854775807"),
                disconnectDelay: Math.floor(this.timers(sentAt).pingDisconnect + 2),
            })
        );
        ping.promise.then(
            () => {
                const sample = (Date.now() - sentAt) / 1000;
                this.rtt = this.rtt ? this.rtt * 0.8 + sample * 0.2 : sample;
            },
            () => {
                if (link.lastPingAt === sentAt) link.lastPingAt = 0;
            }
        );
        this.queue.pushService(ping);
    }

    private probeUnanswered() {
        let ids: bigInt.BigInteger[] = [];
        const flush = () => {
            const probe = new RequestState(new Api.MsgsStateReq({ msgIds: ids }));
            this.probes.set(probe, ids);
            this.queue.pushService(probe);
            ids = [];
        };
        for (const state of this.pending.values()) {
            if (!state.msgId || this.queue.isService(state)) continue;
            ids.push(state.msgId);
            if (ids.length === MAX_IDS_PER_MESSAGE) flush();
        }
        if (ids.length) flush();
    }
}
