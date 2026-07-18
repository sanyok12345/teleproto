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
import { MTProtoState } from "./MTProtoState";

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

const USE_INVOKE_AFTER_WITH = new Set([
    "messages.SendMessage",
    "messages.SendMedia",
    "messages.SendMultiMedia",
    "messages.ForwardMessages",
    "messages.SendInlineBotResult",
]);

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
    isMainSender: boolean;
    dcId: number;
    client: TelegramClient;
    onConnectionBreak?: (dcId: number) => void;
    securityChecks: boolean;
    dcenter?: Dcenter;
    tempBinding?: {
        permAuthKey: AuthKey;
        dcParam: number;
        expiresIn: number;
        onFailed: (err: unknown) => void;
    };
}

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
    private readonly _isMainSender: boolean;
    private _lifecycle: SenderLifecycle = "disconnected";
    readonly authKey: AuthKey;
    private readonly _state: MTProtoState;
    private _queued: RequestState[] = [];
    private _io?: { alive: boolean; connection: Connection };
    private _wakeWriter?: () => void;
    _pendingState: PendingState;
    private readonly _pendingAck: Set<bigInt.BigInteger>;
    private readonly _lastAcks: RequestState[];
    private readonly _dispatcher: MtpDispatcher;
    private readonly _client: TelegramClient;
    private readonly _onConnectionBreak?: (dcId: number) => void;
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
        this._isMainSender = args.isMainSender;
        this._client = args.client;
        this._onConnectionBreak = args.onConnectionBreak;
        this._securityChecks = args.securityChecks;
        this._dcenter = args.dcenter;
        this._tempBinding = args.tempBinding;

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
            dcenter: this._dcenter,
            isMainSender: this._isMainSender,
            ack: (msgId) => {
                this._pendingAck.add(msgId);
                if (this._pendingAck.size >= 16) {
                    this._wakeUp();
                }
            },
            enqueue: (state) => this._enqueue(state),
            requeue: (states) => this._requeue(states),
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
        if (this._tempBinding) {
            this._tempBound = false;
            await this.authKey.setKey(undefined);
        }
        let lastError: unknown;
        for (let attempt = 0; attempt < this._retries; attempt++) {
            try {
                await this._connect();
                if (this._updateCallback) {
                    this._updateCallback(
                        this._client,
                        new UpdateConnectionState(
                            UpdateConnectionState.connected
                        )
                    );
                }
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
                this._log.error(
                    `Connection failed attempt: ${attempt + 1}`,
                    err
                );
                if (this._client._errorHandler) {
                    await this._client._errorHandler(err as Error);
                }
                await sleep(this._delay);
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
        dial.catch(() => {});
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
            connection.socket.close().catch(() => {});
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
        for (const state of this._queued) {
            if (!(state.request instanceof MsgsAck)) state.reject(error);
        }
        this._queued.length = 0;
    }

    send(request: Api.AnyRequest) {
        if (this._lifecycle === "dead") {
            return Promise.reject(
                new Error(
                    `Cannot send ${request.className}: sender for dc ${this._dcId} is disconnected`
                )
            );
        }
        if (this._needsInitConnection && this._isApiRequest(request)) {
            request = new Api.InvokeWithLayer({
                layer: LAYER,
                query: this._buildInitConnection(request),
            }) as unknown as Api.AnyRequest;
            this._needsInitConnection = false;
            this._log.debug("Wrapping request with initConnection");
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

    addStateToQueue(state: RequestState) {
        if (this._lifecycle === "dead") {
            // No loops will ever service the queue of a dead sender —
            // settle the caller instead of stranding it.
            state.reject(
                new Error(
                    `Cannot send ${state.request.className}: sender for dc ${this._dcId} is disconnected`
                )
            );
            return;
        }

        if (
            this._needsInitConnection &&
            this._isApiRequest(state.request)
        ) {
            state.request = new Api.InvokeWithLayer({
                layer: LAYER,
                query: this._buildInitConnection(state.request),
            }) as unknown as Api.AnyRequest;
            state.data = state.request.getBytes();
            this._needsInitConnection = false;
            this._log.debug("Wrapping request with initConnection");
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

    private _requeue(states: RequestState[]) {
        for (const state of states) {
            state.msgId = undefined;
            state.containerId = undefined;
        }
        this._queued.unshift(...states);
        this._wakeUp();
    }

    private _wakeUp() {
        const wake = this._wakeWriter;
        this._wakeWriter = undefined;
        if (wake) wake();
    }

    /**
     * Performs the actual connection, retrying, generating the
     * authorization key if necessary, and starting the send and
     * receive loops.
     * @returns {Promise<void>}
     * @private
     */
    async _connect() {
        const connection = this._connection!;

        if (!connection.isConnected()) {
            this._log.debug(
                "Connecting to {0}...".replace("{0}", connection.toString())
            );
            await this._connectWithTimeout(connection);
            this._log.debug("Connection success!");
        }

        if (!this.authKey.getKey()) {
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

            // Temporary keys are never persisted — they live in the Dcenter.
            if (this._authKeyCallback && !this._tempBinding) {
                await this._authKeyCallback(this.authKey, this._dcId);
            }
        } else {
            this._authenticated = true;
            this._log.debug("Already have an auth key ...");
        }
        if (this._dcenter && !this._dcenter.salt.isZero()) {
            this._state.salt = this._dcenter.salt;
        }
        this._lifecycle = "connected";

        this._startIo(connection);

        if (this._tempBinding && !this._tempBound) {
            try {
                const expiresAt =
                    Math.floor(Date.now() / 1000) +
                    this._state.timeOffset +
                    this._tempBinding.expiresIn;
                const msgId = this._state._getNewMsgId();
                const request = buildBindTempAuthKeyRequest(
                    this._tempBinding.permAuthKey,
                    this.authKey,
                    this._state.sessionId,
                    msgId,
                    expiresAt
                );
                const state = new RequestState(request);
                state.forcedMsgId = msgId;
                this._enqueue(state);
                const ok = await state.promise;
                if (ok === true) {
                    this._tempBound = true;
                    this._log.debug(`Bound temp auth key for dc ${this._dcId}`);
                } else {
                    throw new Error(`bindTempAuthKey answered ${ok}`);
                }
            } catch (err) {
                this._tempBinding.onFailed(err);
                throw err;
            }
        }

        // _disconnected only completes after manual disconnection
        // or errors after which the sender cannot continue such
        // as failing to reconnect or any unexpected error.

        this._log.debug(
            "Connection to %s complete!".replace("%s", connection.toString())
        );
    }

    async _disconnect() {
        const connection = this._connection;
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
        if (this._io) {
            this._io.alive = false;
            this._io = undefined;
        }
        this._wakeUp();
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
                this._queued.push(ack);
            }
            if (!this._queued.length) {
                await new Promise<void>((resolve) => {
                    this._wakeWriter = resolve;
                });
                continue;
            }

            const res = await packRequestBatch(
                this._state,
                this._queued,
                this._log
            );
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
                    this.reconnect();
                }
                return;
            }

            if (!io.alive) {
                this._requeue(batch);
                return;
            }
            try {
                await io.connection.send(data);
            } catch (e) {
                if (io.alive) {
                    this._requeue(batch);
                    this._log.debug(
                        `Connection closed while sending data ${e}`
                    );
                    this.reconnect();
                }
                return;
            }
            for (const state of batch) {
                if (state.request.classType === "request") {
                    this._pendingState.set(state.msgId!, state);
                }
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

                if (e instanceof InvalidBufferError) {
                    if (e.code === 404) {
                        this._handleBadAuthKey();
                    } else {
                        this._log.warn(
                            `Transport error ${e.code} for dc ${this._dcId}, reconnecting`
                        );
                        this.reconnect();
                    }
                    return;
                }

                if (this._currentRetries > this._reconnectRetries) {
                    this._lifecycle = "dead";
                    this._failAllPending(
                        new Error(
                            "Maximum reconnection retries reached. Aborting!"
                        )
                    );
                    return;
                }

                if (this._lifecycle !== "dead") {
                    this._log.info(
                        `Connection to DC ${this._dcId} closed by server, reconnecting`
                    );
                    this.reconnect();
                }
                return;
            }

            try {
                message = await this._state.decryptMessageData(body);
                if (this._client && this._isMainSender) {
                    this._client._lastReceivedAt = Date.now();
                }
                this._log.debug(
                    `[RECV] Decrypted msgId=${message.msgId} type=${message.obj?.className || "unknown"} bodyLen=${body.length}`
                );
            } catch (e) {
                this._log.debug(
                    `Error while receiving items from the network ${e}`
                );
                if (e instanceof TypeNotFoundError) {
                    // Received object which we don't know how to deserialize
                    this._log.info(
                        `Type ${e.invalidConstructorId} not found, remaining data ${e.remaining}`
                    );
                    continue;
                } else if (e instanceof SecurityError) {
                    if (/invalid auth key/i.test(e.message)) {
                        this._handleBadAuthKey();
                        return;
                    }
                    // A step while decoding had the incorrect data. This message
                    // should not be considered safe and it should be ignored.
                    this._log.warn(
                        `Security error while unpacking a received message: ${e}`
                    );
                    continue;
                } else if (e instanceof InvalidBufferError) {
                    // 404 means that the server has "forgotten" our auth key and we need to create a new one.
                    if (e.code === 404) {
                        this._handleBadAuthKey();
                    } else {
                        // this happens sometimes when telegram is having some internal issues.
                        // reconnecting should be enough usually
                        // since the data we sent and received is probably wrong now.
                        this._log.warn(
                            `Invalid buffer ${e.code} for dc ${this._dcId}`
                        );
                        this.reconnect();
                    }
                    return;
                } else {
                    this._log.error("Unhandled error while receiving data", e);
                    if (this._client._errorHandler) {
                        await this._client._errorHandler(e as Error);
                    }
                    this.reconnect();
                    return;
                }
            }
            try {
                await this._dispatcher.process(message);
            } catch (e) {
                if (e instanceof TypeNotFoundError) {
                    // Unknown constructor in an update (e.g. new TL objects not in our schema).
                    // Safe to skip — no reconnect needed.
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
            this._currentRetries = 0;
        }
    }

    // Response Handlers
    _handleBadAuthKey(shouldSkipForMain: boolean = false) {
        if (shouldSkipForMain && this._isMainSender) {
            return;
        }

        if (this._tempBinding) {
            this._log.info(
                `Temp auth key for dc ${this._dcId} expired on the server, re-keying on a fresh session`
            );
        } else {
            this._log.warn(
                `Broken authorization key for dc ${this._dcId}, resetting...`
            );
        }

        if (this._tempBinding) {
            this._lifecycle = "dead";
            this.authKey.setKey(undefined).catch(() => {});
            if (this._onConnectionBreak) {
                this._onConnectionBreak(this._dcId);
            }
            this._failAllPending(
                new Error(
                    `Temporary auth key for dc ${this._dcId} was rejected by the server`
                )
            );
            return;
        }

        if (this._isMainSender) {
            if (this._updateCallback) {
                this._updateCallback(
                    this._client,
                    new UpdateConnectionState(UpdateConnectionState.broken)
                );
            }
            this.authKey
                .setKey(undefined)
                .catch(() => {})
                .then(() => {
                    if (this._authKeyCallback) {
                        return this._authKeyCallback(undefined, this._dcId);
                    }
                })
                .catch(() => {})
                .then(() => this.reconnect());
        } else if (this._onConnectionBreak) {
            this._lifecycle = "dead";
            this._onConnectionBreak(this._dcId);
            this._failAllPending(
                new Error(
                    `Authorization key for dc ${this._dcId} was rejected by the server`
                )
            );
        }
    }

    reconnect() {
        if (this._lifecycle !== "connected") {
            return;
        }
        if (!this._autoReconnect) {
            this._lifecycle = "dead";
            this._disconnect().catch(() => {});
            if (!this._isMainSender && this._onConnectionBreak) {
                this._onConnectionBreak(this._dcId);
            }
            this._failAllPending(
                new Error(`Connection to dc ${this._dcId} was lost`)
            );
            return;
        }
        this._lifecycle = "reconnecting";
        const delay =
            this._currentRetries === 0
                ? 0
                : Math.min(1000 * this._currentRetries, 5000);
        this._currentRetries++;
        sleep(delay).then(() =>
            this._reconnect().catch((err) => {
                this._log.error(
                    `Unexpected error during reconnect to dc ${this._dcId}`,
                    err as Error
                );
                this._lifecycle = "dead";
                this._failAllPending(
                    new Error(`Could not reconnect to dc ${this._dcId}`)
                );
            })
        );
    }

    async _reconnect() {
        try {
            this._log.debug("[Reconnect] Closing current connection...");
            await this._disconnect();
        } catch (err) {
            this._log.warn("Error happened while disconnecting", err);
            if (this._client._errorHandler) {
                await this._client._errorHandler(err as Error);
            }
        }

        const queued = this._queued.splice(0, this._queued.length);

        this._pendingAck.clear();
        this._state.reset();
        this._needsInitConnection = true;
        const connection = this._connection!;

        // For some reason reusing existing connection caused stuck requests
        // @ts-ignore
        const newConnection = new connection.constructor({
            ip: connection._ip,
            port: connection._port,
            dcId: connection._dcId,
            loggers: connection._log,
            proxy: connection._proxy,
            socket: this._client.networkSocket,
            keepAliveInterval: connection._keepAliveInterval,
            testServers: connection._testServers,
        });
        try {
            await this.connect(newConnection, true);
        } catch (err) {
            this._log.error(
                `Failed to reconnect to dc ${this._dcId}`,
                err as Error
            );
            this._lifecycle = "dead";
            if (this._updateCallback) {
                this._updateCallback(
                    this._client,
                    new UpdateConnectionState(UpdateConnectionState.broken)
                );
            }
            if (!this._isMainSender && this._onConnectionBreak) {
                this._onConnectionBreak(this._dcId);
            }
            this._failAllPending(
                new Error(`Could not reconnect to dc ${this._dcId}`)
            );
            return;
        }

        const toResend = [...this._pendingState.values(), ...queued];
        this._pendingState.clear();
        if (toResend.length > 0) {
            this._log.debug(`Resending ${toResend.length} pending requests`);
            this._requeue(toResend);
        }

        if (this._autoReconnectCallback) {
            await this._autoReconnectCallback();
        }
    }
}
