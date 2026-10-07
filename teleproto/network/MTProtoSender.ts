/**
 * MTProto Mobile Protocol sender
 * (https://core.telegram.org/mtproto/description)
 * This class is responsible for wrapping requests into `TLMessage`'s,
 * sending them over the network and receiving them in a safe manner.
 *
 * Automatic reconnection due to temporary network issues is a concern
 * for this class as well, including retry of messages that could not
 * be sent successfully.
 *
 * A new authorization key will be generated on connection if no other
 * key exists yet.
 */
import { AuthKey } from "../crypto/AuthKey";
import { Dcenter } from "./Dcenter";
import { DuplicateMessageError, MTProtoState } from "./MTProtoState";

import { Logger } from "../extensions";
import { packRequestBatch } from "./packing";
import { MtpDispatcher } from "./MtpDispatcher";
import { Api } from "../tl";
import bigInt from "big-integer";
import { sleep } from "../Helpers";
import { RequestState } from "./RequestState";
import { doAuthentication } from "./Authenticator";
import { buildBindTempAuthKeyRequest } from "./TempAuthKey";
import { MTProtoPlainSender } from "./MTProtoPlainSender";
import {
    InvalidBufferError,
    RPCError,
    SecurityError,
    TypeNotFoundError,
} from "../errors";
import { Connection } from "./connection";
import { UpdateConnectionState } from "./UpdateConnectionState";
import type { TelegramClient } from "../client/TelegramClient";
import { LAYER } from "../tl/runtime/registry";
import { PendingState } from "../extensions/PendingState";
import MsgsAck = Api.MsgsAck;

const WATCHDOG_INTERVAL_MS = 1_000;
const PROBE_AFTER_MS = 10_000;
const PROBE_MAX_IDS = 64;
const PROBE_EXPIRY_MS = 60_000;
const SILENCE_MS = 15_000;
const SEND_BYTES_PER_SECOND = 8192;
const SEND_SILENCE_CAP_MS = 64_000;
const RECONNECT_DELAY_STEP_MS = 1_000;
const RECONNECT_DELAY_STEPS = 5;
const TEMP_KEY_REFRESH_MARGIN_S = 3600;

const USE_INVOKE_AFTER_WITH = new Set([
    "messages.SendMessage",
    "messages.SendMedia",
    "messages.SendMultiMedia",
    "messages.ForwardMessages",
    "messages.SendInlineBotResult",
]);

export type ConnectionBreakReason = "disconnected" | "rekey" | "auth-broken";

export type SenderTempBinding = NonNullable<DEFAULT_OPTIONS["tempBinding"]>;

export type SenderLifecycle =
    | "disconnected"
    | "connecting"
    | "connected"
    | "reconnecting"
    | "dead";

interface DEFAULT_OPTIONS {
    logger: Logger;
    retries: number;
    reconnectRetries: number;
    delay: number;
    autoReconnect: boolean;
    connectTimeout: number | null;
    authKeyCallback?: (
        authKey: AuthKey | undefined,
        dcId: number
    ) => Promise<void> | void;
    updateCallback?: (
        client: TelegramClient,
        update: UpdateConnectionState | Api.TypeUpdates
    ) => void;
    autoReconnectCallback?: () => Promise<void> | void;
    lifecycleCallback?: (event: "connecting" | "connect" | "disconnect" | "reconnecting") => void;
    isMainSender: boolean;
    dcId: number;
    client: TelegramClient;
    onConnectionBreak?: (dcId: number, reason?: ConnectionBreakReason) => void;
    securityChecks: boolean;
    dcenter?: Dcenter;
    silenceMs?: number;
    tempBinding?: {
        permAuthKey: AuthKey;
        dcParam: number;
        expiresIn: number;
        onFailed: (err: unknown) => void;
    };
}

const STABLE_CONNECTION_MS = 30_000;

const QUICK_CONNECT_ATTEMPTS = 3;
const QUICK_CONNECT_DELAY_MS = 1;
const CONNECT_DELAY_CAP_MS = 64_000;
const FLAPPING_CONNECTIONS = 5;

export class MTProtoSender {
    static DEFAULT_OPTIONS = {
        reconnectRetries: Infinity,
        retries: Infinity,
        delay: 2000,
        autoReconnect: true,
        connectTimeout: null,
        authKeyCallback: undefined,
        updateCallback: undefined,
        autoReconnectCallback: undefined,
        onConnectionBreak: undefined,
        securityChecks: true,
    };
    _connection?: Connection;
    private readonly _log: Logger;
    private _dcId: number;
    private readonly _retries: number;
    private _reconnectRetries: number;
    private _currentRetries: number;
    private readonly _delay: number;
    private _connectTimeout: number | null;
    private _autoReconnect: boolean;
    private readonly _authKeyCallback?: DEFAULT_OPTIONS["authKeyCallback"];
    public _updateCallback?: DEFAULT_OPTIONS["updateCallback"];
    private readonly _autoReconnectCallback?: DEFAULT_OPTIONS["autoReconnectCallback"];
    private readonly _lifecycleCallback?: DEFAULT_OPTIONS["lifecycleCallback"];
    private readonly _isMainSender: boolean;
    private _lifecycle: SenderLifecycle = "disconnected";
    private _connectedAt = 0;
    private _lastReadAt = 0;
    private _shortLived = 0;
    readonly authKey: AuthKey;
    private readonly _state: MTProtoState;
    private _queued: RequestState[] = [];
    private readonly _control: RequestState[] = [];
    private readonly _controlStates = new WeakSet<RequestState>();
    private _gateOpen = true;
    private _binding?: RequestState;
    private _writeDeadline = 0;
    private _keyRejections = 0;
    private _tempExpiresAt = 0;
    private readonly _silenceMs: number;
    private _io?: { alive: boolean; connection: Connection };
    private _watchdog?: ReturnType<typeof setInterval>;
    private readonly _probes = new Map<
        string,
        { ids: bigInt.BigInteger[]; at: number }
    >();
    private _wakeWriter?: () => void;
    _pendingState: PendingState;
    private readonly _pendingAck: Set<bigInt.BigInteger>;
    private readonly _lastAcks: RequestState[];
    private readonly _dispatcher: MtpDispatcher;
    private readonly _client: TelegramClient;
    private readonly _onConnectionBreak?: (
        dcId: number,
        reason?: ConnectionBreakReason
    ) => void;
    _authenticated: boolean;
    _needsInitConnection: boolean = true;
    private _securityChecks: boolean;
    private readonly _dcenter?: Dcenter;
    private readonly _tempBinding?: DEFAULT_OPTIONS["tempBinding"];
    private _tempBound: boolean = false;

    /**
     * @param authKey
     * @param opts
     */
    constructor(authKey: undefined | AuthKey, opts: DEFAULT_OPTIONS) {
        const args = {
            ...MTProtoSender.DEFAULT_OPTIONS,
            ...opts,
        };
        this._connection = undefined;
        this._log = args.logger;
        this._dcId = args.dcId;
        this._retries = args.retries;
        this._currentRetries = 0;
        this._reconnectRetries = args.reconnectRetries;
        this._delay = args.delay;
        this._autoReconnect = args.autoReconnect;
        this._connectTimeout = args.connectTimeout;
        this._authKeyCallback = args.authKeyCallback;
        this._updateCallback = args.updateCallback;
        this._autoReconnectCallback = args.autoReconnectCallback;
        this._lifecycleCallback = args.lifecycleCallback;
        this._isMainSender = args.isMainSender;
        this._client = args.client;
        this._onConnectionBreak = args.onConnectionBreak;
        this._securityChecks = args.securityChecks;
        this._dcenter = args.dcenter;
        this._tempBinding = args.tempBinding;
        this._silenceMs = args.silenceMs ?? SILENCE_MS;

        this._authenticated = false;

        /**
         * Preserving the references of the AuthKey and state is important
         */
        this.authKey = authKey || new AuthKey();
        this._state = new MTProtoState(
            this.authKey,
            this._log,
            this._securityChecks
        );

        /**
         * Sent states are remembered until a response is received.
         */
        this._pendingState = new PendingState();

        /**
         * Responses must be acknowledged, and we can also batch these.
         */
        this._pendingAck = new Set();

        /**
         * Similar to pending_messages but only for the last acknowledges.
         * These can't go in pending_messages because no acknowledge for them
         * is received, but we may still need to resend their state on bad salts.
         */
        this._lastAcks = [];

        this._dispatcher = new MtpDispatcher({
            log: this._log,
            pendingState: this._pendingState,
            lastAcks: this._lastAcks,
            state: this._state,
            dcenter: this._tempBinding ? undefined : this._dcenter,
            isMainSender: this._isMainSender,
            ack: (msgId) => {
                this._pendingAck.add(msgId);
                if (this._pendingAck.size >= 16) {
                    this._wakeUp();
                }
            },
            enqueue: (state) => this._enqueueControl(state),
            requeue: (states) => this._requeue(states),
            resendBefore: (firstMsgId) => this._resendBefore(firstMsgId),
            requestResend: (msgIds) =>
                this._enqueueControl(
                    new RequestState(new Api.MsgResendReq({ msgIds }))
                ),
            onStateInfo: (reqMsgId, info) => this._onStateInfo(reqMsgId, info),
            onBadAuthKey: (shouldSkipForMain) =>
                this._handleBadAuthKey(shouldSkipForMain),
            markNeedsInitConnection: () => {
                this._needsInitConnection = true;
            },
            dispatchUpdate: (update) => {
                if (this._updateCallback) {
                    this._updateCallback(this._client, update);
                }
            },
        });
    }

    set dcId(dcId: number) {
        this._dcId = dcId;
    }

    get dcId() {
        return this._dcId;
    }

    // Public API

    /**
     * Connects to the specified given connection using the given auth key.
     */
    async connect(connection: Connection, force: boolean): Promise<boolean> {
        if (this._lifecycle === "connected" && !force) {
            this._log.info("User is already connected!");
            return false;
        }
        if (this._lifecycle !== "reconnecting") {
            this._lifecycle = "connecting";
        }
        this._connection = connection;
        this._lifecycleCallback?.("connecting");
        let lastError: unknown;
        let retryDelay = QUICK_CONNECT_DELAY_MS;
        for (let attempt = 0; attempt < this._retries; attempt++) {
            try {
                await this._connect();
                if (this.isConnected()) this._announceConnected();
                return true;
            } catch (err) {
                lastError = err;
                if ((this._lifecycle as SenderLifecycle) === "dead") {
                    break;
                }
                if (this._updateCallback && attempt === 0) {
                    this._updateCallback(
                        this._client,
                        new UpdateConnectionState(
                            UpdateConnectionState.disconnected
                        )
                    );
                }
                const message = `Connection to dc ${this._dcId} failed (attempt ${
                    attempt + 1
                }), next try in ${retryDelay}ms`;
                if (attempt < QUICK_CONNECT_ATTEMPTS) {
                    this._log.error(message, err);
                } else {
                    this._log.warn(`${message}: ${err}`);
                }
                if (this._client._errorHandler) {
                    await this._client._errorHandler(err as Error);
                }
                await sleep(retryDelay);
                retryDelay =
                    attempt + 1 < QUICK_CONNECT_ATTEMPTS
                        ? retryDelay + 1
                        : Math.min(
                              Math.max(this._delay, retryDelay * 2),
                              CONNECT_DELAY_CAP_MS
                          );
            }
        }
        await this._disconnect().catch(() => {});
        throw lastError instanceof Error
            ? lastError
            : new Error(`Failed to connect to dc ${this._dcId}`);
    }

    isConnected() {
        return this._lifecycle === "connected";
    }

    get lifecycle(): SenderLifecycle {
        return this._lifecycle;
    }

    get userDisconnected(): boolean {
        return this._lifecycle === "dead";
    }

    set userDisconnected(value: boolean) {
        if (value) {
            this._lifecycle = "dead";
        } else if (this._lifecycle === "dead") {
            this._lifecycle = "disconnected";
        }
    }

    get _userConnected(): boolean {
        return this._lifecycle === "connected";
    }

    get isReconnecting(): boolean {
        return this._lifecycle === "reconnecting";
    }

    get _disconnected(): boolean {
        return this._lifecycle !== "connected";
    }

    get isConnecting(): boolean {
        return this._lifecycle === "connecting";
    }

    get lastReadAt(): number {
        return Math.max(
            this._connectedAt,
            this._lastReadAt,
            this._connection?.socket.lastDataAt ?? 0
        );
    }

    get hasPendingWork(): boolean {
        return (
            this._queued.length > 0 || this._pendingState._pending.size > 0
        );
    }

    /**
     * Cleanly disconnects the instance from the network, cancels
     * all pending requests, and closes the send and receive loops.
     */
    async disconnect() {
        this._lifecycle = "dead";
        this._log.debug("Disconnecting...");
        await this._disconnect();
        this._failAllPending(
            new Error(`Disconnected from dc ${this._dcId}`)
        );
    }

    /**
     * TCP dial bounded by the client's `timeout` option. Without this an
     * unreachable DC address blocks for the OS default (~75s on macOS),
     * silently burning every request deadline stacked behind the connect.
     */
    private async _connectWithTimeout(connection: Connection) {
        const seconds =
            typeof this._connectTimeout === "number" &&
                this._connectTimeout > 0
                ? this._connectTimeout
                : 10;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const dial = connection.connect();
        dial.catch(() => { });
        try {
            await Promise.race([
                dial,
                new Promise<never>((_, reject) => {
                    timer = setTimeout(
                        () =>
                            reject(
                                new Error(
                                    `Connection to ${connection.toString()} timed out after ${seconds}s`
                                )
                            ),
                        seconds * 1000
                    );
                }),
            ]);
        } catch (err) {
            // Kill the half-open dial so it cannot complete into a ghost
            // connection nobody owns.
            connection.socket.close().catch(() => { });
            throw err;
        } finally {
            if (timer) clearTimeout(timer);
        }
    }

    private _failAllPending(error: Error) {
        for (const state of this._pendingState.values()) {
            state.reject(error);
        }
        this._pendingState.clear();
        for (const state of [...this._queued, ...this._control]) {
            if (!(state.request instanceof MsgsAck)) state.reject(error);
        }
        this._queued.length = 0;
        this._control.length = 0;
    }

    send(request: Api.AnyRequest) {
        if (this._lifecycle === "dead") {
            return Promise.reject(
                new Error(
                    `Cannot send ${request.className}: sender for dc ${this._dcId} is disconnected`
                )
            );
        }
        const state = new RequestState(request);
        this._log.debug(`Send ${request.className}`);
        this._enqueue(state);
        return state.promise;
    }

    /**
     * Checks if a request is a high-level API request (not MTProto service).
     * API requests extend Request<T> and have a `readResult` method.
     */
    private _isApiRequest(request: Api.AnyRequest): boolean {
        if (typeof (request as any).readResult !== "function") return false;
        if (request instanceof Api.InvokeWithLayer) return false;
        if (request instanceof Api.Ping) return false;
        if (request instanceof Api.PingDelayDisconnect) return false;
        if (request instanceof Api.GetFutureSalts) return false;
        if (request instanceof Api.RpcDropAnswer) return false;
        if (request instanceof Api.DestroySession) return false;
        return true;
    }

    /** Stops local delivery and retries; Telegram may already have executed the request. */
    cancelRequest(state: RequestState, reason: unknown): void {
        state.cancelled = true;
        for (let index = this._queued.length - 1; index >= 0; index--) {
            if (this._queued[index] === state) this._queued.splice(index, 1);
        }
        if (state.msgId) this._pendingState.delete(state.msgId);
        state.promise?.catch(() => {});
        state.reject(reason);
        state.finished.resolve();
    }

    addStateToQueue(state: RequestState) {
        if (state.cancelled) return;
        if (this._lifecycle === "dead") {
            state.reject(
                new Error(
                    `Cannot send ${state.request.className}: sender for dc ${this._dcId} is disconnected`
                )
            );
            return;
        }
        this._enqueue(state);
    }

    private _buildInitConnection(query: Api.AnyRequest) {
        return new Api.InitConnection({
            apiId: this._client.apiId,
            deviceModel: this._client._initRequest.deviceModel,
            systemVersion: this._client._initRequest.systemVersion,
            appVersion: this._client._initRequest.appVersion,
            langCode: this._client._initRequest.langCode,
            langPack: this._client._initRequest.langPack,
            systemLangCode: this._client._initRequest.systemLangCode,
            proxy: this._client._initRequest.proxy,
            query,
        });
    }

    private _wrapInitConnection() {
        if (!this._needsInitConnection) return;
        for (const state of this._queued) {
            if (state.cancelled) continue;
            if (state.request instanceof Api.InvokeWithLayer) {
                this._needsInitConnection = false;
                return;
            }
            if (!this._isApiRequest(state.request)) continue;
            state.request = new Api.InvokeWithLayer({
                layer: LAYER,
                query: this._buildInitConnection(state.request),
            }) as unknown as Api.AnyRequest;
            state.data = state.request.getBytes();
            this._needsInitConnection = false;
            this._log.debug("Wrapping request with initConnection");
            return;
        }
    }

    private _enqueue(state: RequestState, atStart = false) {
        if (
            state.request.className &&
            USE_INVOKE_AFTER_WITH.has(state.request.className)
        ) {
            if (atStart) {
                for (const queued of this._queued) {
                    if (USE_INVOKE_AFTER_WITH.has(queued.request.className)) {
                        queued.after = state;
                        break;
                    }
                }
            } else {
                for (let i = this._queued.length - 1; i >= 0; i--) {
                    if (
                        USE_INVOKE_AFTER_WITH.has(
                            this._queued[i].request.className
                        )
                    ) {
                        state.after = this._queued[i];
                        break;
                    }
                }
            }
        }
        if (atStart) {
            this._queued.unshift(state);
        } else {
            this._queued.push(state);
        }
        this._wakeUp();
    }

    private _enqueueControl(state: RequestState) {
        this._controlStates.add(state);
        this._control.push(state);
        this._wakeUp();
    }

    private _requeue(states: RequestState[]) {
        const normal: RequestState[] = [];
        const control: RequestState[] = [];
        for (const state of states) {
            if (state.cancelled) continue;
            state.msgId = undefined;
            state.containerId = undefined;
            (this._controlStates.has(state) ? control : normal).push(state);
        }
        this._control.unshift(...control);
        this._queued.unshift(...normal);
        this._wakeUp();
    }

    private _resendBefore(firstMsgId: bigInt.BigInteger) {
        const stale = this._pendingState
            .values()
            .filter(
                (state) =>
                    state.msgId &&
                    state.msgId.lesser(firstMsgId) &&
                    !this._controlStates.has(state)
            );
        if (!stale.length) return;
        for (const state of stale) this._pendingState.delete(state.msgId!);
        this._log.info(
            `Resending ${stale.length} request(s) on dc ${this._dcId} after the server started a new session`
        );
        this._requeue(stale);
    }

    private _wakeUp() {
        const wake = this._wakeWriter;
        this._wakeWriter = undefined;
        if (wake) wake();
    }

    private _announceConnected() {
        this._lifecycleCallback?.("connect");
        if (this._updateCallback) {
            this._updateCallback(
                this._client,
                new UpdateConnectionState(UpdateConnectionState.connected)
            );
        }
    }

    private _assertCurrent(connection: Connection) {
        if (this._lifecycle === "dead" || connection !== this._connection) {
            throw new Error("Connection attempt cancelled");
        }
    }

    private _tempKeyUsable(): boolean {
        const now = Date.now() / 1000 + this._state.timeOffset;
        return (
            this._tempBound &&
            now < this._tempExpiresAt - TEMP_KEY_REFRESH_MARGIN_S
        );
    }

    private _startNewSession() {
        this._state.reset();
        this._pendingAck.clear();
        this._probes.clear();
        this._needsInitConnection = true;
        const sent = this._pendingState.values();
        this._pendingState.clear();
        const resend: RequestState[] = [];
        for (const state of sent) {
            if (this._controlStates.has(state)) {
                state.reject(new Error(`Session for dc ${this._dcId} was reset`));
            } else {
                resend.push(state);
            }
        }
        this._requeue(resend);
    }

    async _connect() {
        const connection = this._connection!;
        try {
            if (!connection.isConnected()) {
                this._log.debug(`Connecting to ${connection.toString()}...`);
                await this._connectWithTimeout(connection);
                this._log.debug("Connection success!");
            }
            this._assertCurrent(connection);
            if (
                this._tempBinding &&
                this.authKey.getKey() &&
                !this._tempKeyUsable()
            ) {
                this._tempBound = false;
                await this.authKey.setKey(undefined);
            }
            if (!this.authKey.getKey()) {
                await this._createKey(connection);
            } else {
                this._authenticated = true;
                this._log.debug("Already have an auth key ...");
            }
            this._assertCurrent(connection);
        } catch (err) {
            await connection.disconnect().catch(() => {});
            throw err;
        }
        if (
            !this._tempBinding &&
            this._state.salt.isZero() &&
            this._dcenter &&
            !this._dcenter.salt.isZero()
        ) {
            this._state.salt = this._dcenter.salt;
        }
        this._lifecycle = "connected";
        this._connectedAt = Date.now();
        this._gateOpen = !this._tempBinding || this._tempBound;
        this._startIo(connection);
        if (!this._gateOpen) {
            await this._bindTempKey(connection);
        }
        this._log.debug(`Connection to ${connection.toString()} complete!`);
    }

    private async _createKey(connection: Connection) {
        const plain = new MTProtoPlainSender(connection, this._log);
        this._log.debug("New auth_key attempt ...");
        const res = await doAuthentication(
            plain,
            this._log,
            this._tempBinding
                ? {
                    expiresIn: this._tempBinding.expiresIn,
                    dc: this._tempBinding.dcParam,
                }
                : undefined
        );
        this._log.debug("Generated new auth_key successfully");
        await this.authKey.setKey(res.authKey);
        this._state.timeOffset = res.timeOffset;
        this._startNewSession();
        this._state.salt = res.serverSalt;
        if (this._tempBinding) {
            this._tempBound = false;
            this._tempExpiresAt =
                Math.floor(Date.now() / 1000) +
                res.timeOffset +
                this._tempBinding.expiresIn;
        } else if (this._authKeyCallback) {
            await this._authKeyCallback(this.authKey, this._dcId);
        }
    }

    private async _bindTempKey(connection: Connection) {
        const binding = this._tempBinding!;
        const msgId = this._state._getNewMsgId();
        const state = new RequestState(
            buildBindTempAuthKeyRequest(
                binding.permAuthKey,
                this.authKey,
                this._state.sessionId,
                msgId,
                this._tempExpiresAt
            )
        );
        state.forcedMsgId = msgId;
        this._binding = state;
        this._enqueueControl(state);
        let answer: unknown;
        try {
            answer = await state.promise;
        } catch (err) {
            if (this._lifecycle !== "connected" || this._connection !== connection) {
                return;
            }
            this._failBinding(err);
            throw err;
        } finally {
            if (this._binding === state) this._binding = undefined;
        }
        if (answer !== true) {
            const err = new Error(`bindTempAuthKey answered ${answer}`);
            this._failBinding(err);
            throw err;
        }
        this._tempBound = true;
        this._needsInitConnection = true;
        this._gateOpen = true;
        this._log.debug(`Bound temp auth key for dc ${this._dcId}`);
        this._wakeUp();
    }

    private _failBinding(err: unknown) {
        this._tempBinding!.onFailed(err);
        this._giveUp(
            err instanceof Error ? err : new Error(String(err)),
            "rekey",
            false
        );
    }

    async _disconnect() {
        const connection = this._connection;
        this._lifecycleCallback?.("disconnect");
        if (this._updateCallback) {
            this._updateCallback(
                this._client,
                new UpdateConnectionState(UpdateConnectionState.disconnected)
            );
        }

        if (connection === undefined) {
            this._log.info("Not disconnecting (already have no connection)");
            return;
        }

        this._log.debug(
            "Disconnecting from %s...".replace("%s", connection.toString())
        );

        if (
            this._lifecycle !== "reconnecting" &&
            this._lifecycle !== "dead"
        ) {
            this._lifecycle = "disconnected";
        }
        this._log.debug("Closing current connection...");
        this._stopIo();
        await connection.disconnect();
    }

    private _startIo(connection: Connection) {
        if (this._io?.alive && this._io.connection === connection) {
            return;
        }
        const io = { alive: true, connection };
        this._io = io;
        this._writeDeadline = 0;
        if (this._watchdog) clearInterval(this._watchdog);
        this._watchdog = setInterval(() => this._watch(), WATCHDOG_INTERVAL_MS);
        this._watchdog.unref?.();
        this._log.debug("Starting I/O loops");
        this._readLoop(io).catch((err) =>
            this._log.error(
                `Read loop crashed for dc ${this._dcId}`,
                err as Error
            )
        );
        this._writeLoop(io).catch((err) =>
            this._log.error(
                `Write loop crashed for dc ${this._dcId}`,
                err as Error
            )
        );
    }

    private _stopIo() {
        if (this._watchdog) {
            clearInterval(this._watchdog);
            this._watchdog = undefined;
        }
        if (this._io) {
            this._io.alive = false;
            this._io = undefined;
        }
        const binding = this._binding;
        if (binding) {
            this._binding = undefined;
            if (binding.msgId) this._pendingState.delete(binding.msgId);
            binding.reject(
                new Error(`Connection to dc ${this._dcId} was lost while binding the temporary key`)
            );
        }
        this._wakeUp();
    }

    private _watch() {
        if (this._lifecycle !== "connected" || !this._io?.alive) return;
        const now = Date.now();
        const waiting = this._pendingState._pending.size;
        if (waiting > 0) {
            const quietUntil = Math.max(
                this.lastReadAt + this._silenceMs,
                this._writeDeadline
            );
            if (now > quietUntil) {
                this._log.info(
                    `dc ${this._dcId} sent nothing for ${Math.round(
                        (now - this.lastReadAt) / 1000
                    )}s while ${waiting} request(s) wait, reconnecting`
                );
                this._transportLost();
                return;
            }
        }
        this._probeUnanswered(now, PROBE_AFTER_MS);
    }

    private _probeUnanswered(now: number, after: number) {
        for (const [key, probe] of this._probes) {
            if (now - probe.at >= PROBE_EXPIRY_MS) this._probes.delete(key);
        }
        let ids: bigInt.BigInteger[] = [];
        for (const state of this._pendingState.values()) {
            if (!state.msgId || state.sentAt === undefined) continue;
            if (now - (state.probedAt ?? state.sentAt) < after) continue;
            state.probedAt = now;
            ids.push(state.msgId);
            if (ids.length === PROBE_MAX_IDS) {
                this._sendProbe(ids, now);
                ids = [];
            }
        }
        if (ids.length) this._sendProbe(ids, now);
    }

    private _sendProbe(ids: bigInt.BigInteger[], now: number) {
        const probe = new RequestState(new Api.MsgsStateReq({ msgIds: ids }));
        probe.forcedMsgId = this._state._getNewMsgId();
        this._probes.set(probe.forcedMsgId.toString(), { ids, at: now });
        this._log.debug(
            `Probing ${ids.length} unanswered request(s) on dc ${this._dcId}`
        );
        this._enqueueControl(probe);
    }

    private _onStateInfo(reqMsgId: bigInt.BigInteger, info: Buffer | string) {
        const key = reqMsgId.toString();
        const probe = this._probes.get(key);
        if (!probe) return;
        this._probes.delete(key);
        const codes = Buffer.isBuffer(info)
            ? info
            : Buffer.from(String(info), "binary");
        const resend: RequestState[] = [];
        probe.ids.forEach((id, index) => {
            if (index >= codes.length) return;
            const state = this._pendingState.get(id);
            if (!state || this._controlStates.has(state)) return;
            if ((codes[index] & 7) === 4) return;
            this._pendingState.delete(id);
            resend.push(state);
        });
        if (!resend.length) return;
        this._log.info(
            `Resending ${resend.length} request(s) the server never received on dc ${this._dcId}`
        );
        this._requeue(resend);
    }

    private _replyWindow(bytes: number): number {
        return Math.max(
            this._silenceMs,
            Math.min(SEND_SILENCE_CAP_MS, (bytes / SEND_BYTES_PER_SECOND) * 1000)
        );
    }

    private async _writeLoop(io: { alive: boolean; connection: Connection }) {
        while (io.alive) {
            if (this._pendingAck.size) {
                const ack = new RequestState(
                    new MsgsAck({ msgIds: Array(...this._pendingAck) })
                );
                this._pendingAck.clear();
                this._lastAcks.push(ack);
                if (this._lastAcks.length >= 10) {
                    this._lastAcks.shift();
                }
                this._controlStates.add(ack);
                this._control.push(ack);
            }
            const queue = this._control.length
                ? this._control
                : this._gateOpen && this._queued.length
                    ? this._queued
                    : undefined;
            if (!queue) {
                await new Promise<void>((resolve) => {
                    this._wakeWriter = resolve;
                });
                continue;
            }
            if (queue === this._queued) this._wrapInitConnection();

            const res = await packRequestBatch(this._state, queue, this._log);
            if (!res) continue;
            let { data } = res;
            const { batch } = res;
            this._log.debug(
                `Sending ${batch.length} message(s): ${batch
                    .map((m: RequestState) => m.request.className)
                    .join(",")}`
            );
            try {
                data = await this._state.encryptMessageData(data);
            } catch (e) {
                this._requeue(batch);
                if (io.alive) {
                    this._log.error(
                        `Failed to encrypt batch for dc ${this._dcId}`,
                        e as Error
                    );
                    this._transportLost();
                }
                return;
            }

            if (!io.alive) {
                this._requeue(batch);
                return;
            }
            if (batch.some((state) => state.cancelled)) {
                this._requeue(batch);
                continue;
            }
            try {
                await io.connection.send(data);
            } catch (e) {
                this._requeue(batch);
                if (io.alive) {
                    this._log.debug(
                        `Connection closed while sending data ${e}`
                    );
                    this._transportLost();
                }
                return;
            }
            const sentAt = Date.now();
            let expectsReply = false;
            for (const state of batch) {
                state.sentAt = sentAt;
                state.probedAt = undefined;
                if (!state.cancelled && state.request.classType === "request") {
                    this._pendingState.set(state.msgId!, state);
                    expectsReply = true;
                }
            }
            if (expectsReply) {
                this._writeDeadline = Math.max(
                    this._writeDeadline,
                    sentAt + this._replyWindow(data.length)
                );
            }
        }
    }

    private async _readLoop(io: { alive: boolean; connection: Connection }) {
        let body;
        let message;

        while (io.alive) {
            try {
                body = await io.connection.recv();
            } catch (e) {
                if (!io.alive) {
                    return;
                }
                this._onReadFailure(e);
                return;
            }

            this._lastReadAt = Date.now();
            try {
                message = await this._state.decryptMessageData(body);
            } catch (e) {
                if (e instanceof DuplicateMessageError) {
                    this._pendingAck.add(e.msgId);
                    continue;
                }
                this._log.debug(
                    `Error while receiving items from the network ${e}`
                );
                if (e instanceof TypeNotFoundError) {
                    if (this._isMainSender) void this._client.updateManager.catchUp();
                    this._log.info(
                        `Type ${e.invalidConstructorId} not found, remaining data ${e.remaining}`
                    );
                    continue;
                }
                if (e instanceof SecurityError) {
                    if (/invalid auth key/i.test(e.message)) {
                        this._handleBadAuthKey();
                        return;
                    }
                    this._log.warn(
                        `Security error while unpacking a received message: ${e}`
                    );
                    continue;
                }
                if (e instanceof InvalidBufferError && e.code === 404) {
                    this._handleBadAuthKey();
                    return;
                }
                if (e instanceof InvalidBufferError) {
                    await this._client._errorHandler?.(e as Error);
                }
                continue;
            }
            this._currentRetries = 0;
            this._keyRejections = 0;
            if (this._client && this._isMainSender) {
                this._client._lastReceivedAt = Date.now();
            }
            this._log.debug(
                `[RECV] Decrypted msgId=${message.msgId} type=${message.obj?.className || "unknown"} bodyLen=${body.length}`
            );

            try {
                await this._dispatcher.process(message);
            } catch (e) {
                if (e instanceof TypeNotFoundError) {
                    if (this._isMainSender) void this._client.updateManager.catchUp();
                    this._log.info(
                        `Unknown constructor ${e.invalidConstructorId} in update, skipping (remaining: ${e.remaining.length} bytes)`
                    );
                } else if (!(e instanceof RPCError)) {
                    this._log.error("Unhandled error while receiving data", e);
                    if (this._client._errorHandler) {
                        await this._client._errorHandler(e as Error);
                    }
                }
            }
            if (
                this._shortLived !== 0 &&
                Date.now() - this._connectedAt >= STABLE_CONNECTION_MS
            ) {
                this._shortLived = 0;
            }
        }
    }

    private _onReadFailure(e: unknown) {
        if (e instanceof InvalidBufferError && e.code === 404) {
            this._handleBadAuthKey();
            return;
        }
        if (e instanceof InvalidBufferError && e.code === 429) {
            this._log.warn(
                `dc ${this._dcId} refused the connection: too many connections from this address, backing off`
            );
            this._transportLost(RECONNECT_DELAY_STEP_MS);
            return;
        }
        if (e instanceof InvalidBufferError) {
            this._log.warn(
                `Transport error ${e.code} for dc ${this._dcId}, reconnecting`
            );
            this._transportLost();
            return;
        }
        const aliveFor = Date.now() - this._connectedAt;
        this._shortLived = aliveFor < STABLE_CONNECTION_MS ? this._shortLived + 1 : 0;
        this._log.info(
            `Connection to DC ${this._dcId} closed by server after ${aliveFor}ms (${e}), reconnecting`
        );
        if (
            this._shortLived >= FLAPPING_CONNECTIONS &&
            this._shortLived % FLAPPING_CONNECTIONS === 0
        ) {
            this._log.warn(
                `Connection to DC ${this._dcId} died ${this._shortLived} times in a row without staying up for ${STABLE_CONNECTION_MS / 1000}s: the network path (or proxy) keeps dropping it`
            );
        }
        this._transportLost();
    }

    _handleBadAuthKey(shouldSkipForMain: boolean = false) {
        if (shouldSkipForMain) {
            if (this._isMainSender) return;
            this._log.info(
                `Authorization is not imported on dc ${this._dcId}, re-importing on a fresh session`
            );
            this._giveUp(
                new Error(`Authorization for dc ${this._dcId} was not imported`),
                "rekey",
                false
            );
            return;
        }

        if (this._tempBinding) {
            this._log.info(
                `Temp auth key for dc ${this._dcId} expired on the server, re-keying on a fresh session`
            );
            this._tempBound = false;
            this._transportLost();
            return;
        }

        if (this._keyRejections++ === 0) {
            this._log.info(
                `dc ${this._dcId} did not recognise the auth key, retrying on a fresh session`
            );
            this._startNewSession();
            this._transportLost();
            return;
        }

        this._log.warn(
            `Broken authorization key for dc ${this._dcId}, resetting...`
        );
        if (!this._isMainSender) {
            this._giveUp(
                new Error(
                    `Authorization key for dc ${this._dcId} was rejected by the server`
                ),
                "auth-broken",
                false
            );
            return;
        }
        if (this._updateCallback) {
            this._updateCallback(
                this._client,
                new UpdateConnectionState(UpdateConnectionState.broken)
            );
        }
        void this.authKey.setKey(undefined);
        this._transportLost();
        Promise.resolve(this._authKeyCallback?.(undefined, this._dcId)).catch(
            () => {}
        );
    }

    reconnect() {
        this._transportLost();
    }

    private _transportLost(minDelayMs = 0) {
        if (this._lifecycle !== "connected") {
            return;
        }
        if (!this._autoReconnect) {
            this._disconnect().catch(() => {});
            this._giveUp(
                new Error(`Connection to dc ${this._dcId} was lost`),
                "disconnected",
                false
            );
            return;
        }
        this._lifecycle = "reconnecting";
        this._lifecycleCallback?.("reconnecting");
        this._disconnect().catch(() => {});
        this._scheduleReconnect(minDelayMs);
    }

    private _scheduleReconnect(minDelayMs: number) {
        const attempt = this._currentRetries++;
        const delay = Math.max(
            minDelayMs,
            Math.min(attempt, RECONNECT_DELAY_STEPS) * RECONNECT_DELAY_STEP_MS
        );
        sleep(delay)
            .then(() => this._reconnect())
            .catch((err) => {
                this._log.error(
                    `Unexpected error during reconnect to dc ${this._dcId}`,
                    err as Error
                );
                this._giveUp(
                    new Error(`Could not reconnect to dc ${this._dcId}`),
                    "disconnected",
                    true
                );
            });
    }

    private _giveUp(error: Error, reason: ConnectionBreakReason, broken: boolean) {
        const wasDead = this._lifecycle === "dead";
        this._lifecycle = "dead";
        this._stopIo();
        this._connection?.disconnect().catch(() => {});
        if (broken && this._updateCallback) {
            this._updateCallback(
                this._client,
                new UpdateConnectionState(UpdateConnectionState.broken)
            );
        }
        if (!this._isMainSender && !wasDead) {
            this._onConnectionBreak?.(this._dcId, reason);
        }
        this._failAllPending(error);
    }

    async _reconnect() {
        if (this._lifecycle !== "reconnecting") return;
        if (this._currentRetries > this._reconnectRetries) {
            this._giveUp(
                new Error("Maximum reconnection retries reached. Aborting!"),
                "disconnected",
                true
            );
            return;
        }
        const previous = this._connection!;
        // @ts-ignore
        const connection: Connection = new previous.constructor({
            ip: previous._ip,
            port: previous._port,
            dcId: previous._dcId,
            loggers: previous._log,
            proxy: previous._proxy,
            socket: this._client.networkSocket,
            keepAliveInterval: previous._keepAliveInterval,
            testServers: previous._testServers,
        });
        this._connection = connection;
        try {
            await this._connect();
        } catch (err) {
            if (this._lifecycle !== "reconnecting") return;
            this._log.warn(`Reconnect to dc ${this._dcId} failed: ${err}`);
            this._scheduleReconnect(0);
            return;
        }
        if (!this.isConnected()) return;
        this._announceConnected();
        this._probeUnanswered(Date.now(), 0);
        this._wakeUp();
        if (this._autoReconnectCallback) {
            await this._autoReconnectCallback();
        }
    }
}
