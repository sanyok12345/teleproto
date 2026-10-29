import { Connection } from "../network";
import { LegacySocketTransport } from "../compat/LegacySocketTransport";
import type { SocketFactory as LegacySocketFactory } from "../compat/extensions/SocketInterface";
import { isLegacyProxyConnection } from "../compat/network/connection/TCPMTProxy";
import type { TelegramClient } from "./TelegramClient";
import { version } from "../Version";
import { net, system } from "../platform";
import { Session, StoreSession } from "../sessions";
import { Logger } from "../extensions";
import { Api } from "../tl";

import { AuthKey } from "../crypto/AuthKey";
import { addServerKey } from "../crypto/RSA";
import { IGE } from "../crypto/IGE";
import { EntityCache } from "../entityCache";
import type { EntityCacheOptions } from "../entityCache";
import type { ParseInterface } from "./methods/messageParse";
import type { EventBuilder } from "../events/common";
import { MarkdownParser } from "../extensions/markdown";
import { Session as MTProtoSender, type ConnectionBreakReason, type SenderTempBinding } from "../network/session/Session";
import { DcStateRegistry } from "../network/dc/DcState";
import { SessionPool } from "../network/dc/SessionPool";
import type { SessionLease } from "../network/dc/SessionPool";
import { DC_PORT, DcAddressBook, isTestDcAddress, type DcAddress } from "../network/dc/DcAddressBook";
import { FileTransfers, type TransferBalance } from "./files/FileTransfers";
import { LAYER } from "../tl/runtime/Registry";
import { LogLevel } from "../extensions/Logger";
import Deferred from "../extensions/Deferred";
import { UpdateManager } from "./updates/UpdateManager";
import { UpdateDispatcher } from "./updates/UpdateDispatcher";
import { UpdateLoop } from "./updates/UpdateLoop";
import type { ClientUpdates } from "./updates/ClientUpdates";
import type { ResolvedTransport, Transport } from "../network/transport/Transport";
import { TcpTransport } from "../network/transport/TcpTransport";
import { WebSocketTransport } from "../network/transport/WebSocketTransport";
import { SocksTransport } from "../network/transport/SocksTransport";
import { MTProxyTransport } from "../network/transport/MTProxyTransport";
import { WebProxyTransport, type WebProxyOptions } from "../network/transport/WebProxyTransport";

const SESSION_IDLE_TIMEOUT_MS = 300_000;
const SESSION_STARTUP_DELAY_MS = 800;

type LifecycleEvent = "connecting" | "connect" | "disconnect" | "reconnecting" | "reconnect" | "destroy";
type LifecycleHandler = () => void | Promise<void>;

const PROD_DEFAULT_DC_ID = 2;
const TEST_DEFAULT_DC_ID = 2;

export {
    PROD_DC_IPV4,
    PROD_DC_IPV6,
    TEST_DC_IPV4,
    TEST_DC_IPV6,
    WEBSOCKET_DC_HOSTS,
    webSocketDcAddress,
} from "../network/dc/DcAddressBook";

/** @deprecated Use the `transport` client option. */
export type WebProxyType = WebProxyOptions & { WEB: true };

/** @deprecated Use the `transport` client option. */
export type ProxyInterface =
    | { MTProxy: true; ip: string; port: number; secret: string; timeout?: number }
    | {
          socksType: 4 | 5;
          ip: string;
          port: number;
          username?: string;
          password?: string;
          timeout?: number;
      }
    | WebProxyType;

function proxyTransport(proxy: ProxyInterface): Transport {
    if ("WEB" in proxy) {
        const { WEB: _, ...options } = proxy;
        return new WebProxyTransport(options);
    }
    if ("MTProxy" in proxy) {
        return new MTProxyTransport({ host: proxy.ip, port: proxy.port, secret: proxy.secret });
    }
    return new SocksTransport({
        host: proxy.ip,
        port: proxy.port,
        version: proxy.socksType,
        username: proxy.username,
        password: proxy.password,
        timeout: proxy.timeout,
    });
}

/**
 * Interface for creating a new client.
 * All of these have a default value and you should only change those if you know what you are doing.
 */
function jsonValue(value: Api.TypeJSONValue): unknown {
    if (value instanceof Api.JsonObject) return Object.fromEntries(value.value.map((entry) => [entry.key, jsonValue(entry.value)]));
    if (value instanceof Api.JsonArray) return value.value.map(jsonValue);
    if (value instanceof Api.JsonNull) return null;
    return (value as { value: unknown }).value;
}

export interface DownloadPoolOptions {
    partSize?: number;
    sessions?: number;
    inflightPerDc?: number;
    download?: TransferBalance & Record<string, unknown>;
    upload?: TransferBalance & Record<string, unknown>;
    idleTimeoutMs?: number;
    sessionStartupDelayMs?: number;
    maxSessions?: number;
    requestRetries?: number;
    requestDeadlineMs?: number;
    cdnSupported?: boolean;
}

export interface TelegramClientParams {
    /** MTProto packet framing. Defaults to {@link ConnectionTCPObfuscated}. */
    connection?: typeof Connection;
    /**
     * Whether to connect to the servers through IPv6 or not. By default this is false.
     */
    useIPV6?: boolean;
    /**
     * Whether to connect to Telegram's test environment instead of production.
     *
     * When `true`:
     * - The client starts from test DC2 (`149.154.167.40`). DC routing follows the same
     *   path as production: `help.GetConfig` is the runtime source of truth, with the
     *   built-in test seed table (DC1/DC2/DC3) used as a fallback.
     * - You must use a test phone number of the form `99966<dc><4 digits>`; the login
     *   code is the DC digit repeated 5 times (e.g. `22222` for DC2).
     * - Test sessions are not interchangeable with production sessions.
     *
     * Defaults to `false`.
     */
    testServers?: boolean;
    /**
     * The timeout in seconds for establishing a TCP connection to a DC.
     * An address that exceeds it is closed, the attempt fails fast and the
     * next attempt rotates to an alternative address of that DC.
     */
    timeout?: number;
    /**
     * How many times a request should be retried.<br/>
     * Request are retried when Telegram is having internal issues (due to INTERNAL error or RPC_CALL_FAIL error),<br/>
     * when there is a errors.FloodWaitError less than floodSleepThreshold, or when there's a migrate error.<br/>
     * defaults to 5.
     */
    requestRetries?: number;
    /**
     * How many times the connection should retry, either on the initial connection or when Telegram disconnects us.<br/>
     * May be set to a negative or undefined value for infinite retries, but this is not recommended, since the program can get stuck in an infinite loop.<br/>
     * defaults to 5
     */
    connectionRetries?: number;
    /**
     * How many times to reconnect before giving up. This happens after the initial connection is finished<br/>
     * defaults to infinity
     */
    reconnectRetries?: number;
    /**
     * How the client reaches Telegram: `TcpTransport` (default; `WebSocketTransport` where TCP is unavailable), `SocksTransport`, `HttpProxyTransport`,
     * `MTProxyTransport`, `WebSocketTransport` or `WebProxyTransport`.
     */
    transport?: Transport;
    /** @deprecated Use `transport`: `MTProxyTransport`, `SocksTransport` or `WebProxyTransport`. */
    proxy?: ProxyInterface;
    /** @deprecated Use `transport`: `TcpTransport`, `WebSocketTransport`, `SocksTransport`, or your own `Transport`. */
    networkSocket?: LegacySocketFactory;
    /**
     * How many times we should retry borrowing a sender from another DC when it fails. defaults to 5
     */
    downloadRetries?: number;
    /** The delay in milliseconds to sleep between automatic reconnections. defaults to 1000*/
    retryDelay?: number;
    /**Whether reconnection should be retried connection_retries times automatically if Telegram disconnects us or not. defaults to true */
    autoReconnect?: boolean;
    /** Deliver updates one at a time, awaiting all handlers. Defaults to false. Slow handlers accumulate queued updates; destroy clears pending work. */
    sequentialUpdates?: boolean;
    /** The threshold below which the library should automatically sleep on flood wait and slow mode wait errors (inclusive).<br/>
     *  For instance, if a FloodWaitError for 17s occurs and floodSleepThreshold is 20s, the library will sleep automatically.<br/>
     *  If the error was for 21s, it would raise FloodWaitError instead. defaults to 60 sec.*/
    floodSleepThreshold?: number;
    /**
     * Device model to be sent when creating the initial connection. Defaults to os.type().toString().
     */
    deviceModel?: string;
    /**
     * System version to be sent when creating the initial connection. defaults to os.release().toString() -.
     */
    systemVersion?: string;
    /**
     * App version to be sent when creating the initial connection. Defaults to 1.0.
     */
    appVersion?: string;
    /**
     * Language code to be sent when creating the initial connection. Defaults to 'en'.
     */
    langCode?: string;
    /**
     * Language pack of the app. `langCode` is sent only together with it. Defaults to empty.
     */
    langPack?: string;
    /**
     * Use temporary auth keys (perfect forward secrecy) for file transfers. Defaults to false;
     * also turned on when Telegram asks for it with `tmp_sessions` in the config.
     */
    pfs?: boolean;
    /**
     * System lang code to be sent when creating the initial connection. Defaults to 'en'.
     */
    systemLangCode?: string;
    /**
     * Instance of Logger to use. <br />
     * If a `Logger` is given, it'll be used directly. If nothing is given, the default logger will be used. <br />
     * To create your own Logger make sure you extends teleproto logger {@link Logger} and override `log` method.
     */
    baseLogger?: Logger;
    /**
     * Limits how many downloads happen at the same time.
     */
    maxConcurrentDownloads?: number;
    /**
     * Whether to check for tampering in messages or not.
     */
    securityChecks?: boolean;
    /**
     * TCP keep-alive probe interval in milliseconds. Defaults to 30000.
     * Set to 0 to disable keep-alive probes.
     */
    keepAliveInterval?: number;
    /**
     * Callback for handling reCAPTCHA verification.
     * It should return the token obtained after solving the CAPTCHA.
     */
    reCaptchaCallback?: (siteKey: string) => Promise<string>;
    downloadPool?: DownloadPoolOptions;
    /** Channel polling fallback in milliseconds when Telegram omits timeout. Defaults to 1000. */
    channelPollInterval?: number;
    /** Minimum spacing in milliseconds between scheduled channel RPCs. Defaults to 250; not a Telegram rate guarantee. */
    channelPollRequestInterval?: number;
    /** Maximum concurrent scheduled channel RPCs. Defaults to 2. More watched channels increase polling latency. */
    channelPollConcurrency?: number;
    /**
     * Bounds the in-memory entity cache (the hot working set of resolved
     * peers; the session remains the storage tier).
     *
     * omitted / `true` - default limit (4096 peers per user/chat segment);
     * `false` - disabled, peers are resolved straight from the session store;
     * `{ max?, ttl? }` - explicit policy, `ttl` in milliseconds, `{ max: 0 }` for an unbounded cache.
     */
    entityCache?: EntityCacheOptions;
}

const clientParamsDefault = {
    useIPV6: false,
    testServers: false,
    timeout: 10,
    requestRetries: 5,
    connectionRetries: Infinity,
    reconnectRetries: Infinity,
    retryDelay: 1000,
    downloadRetries: 5,
    autoReconnect: true,
    sequentialUpdates: false,
    floodSleepThreshold: 60,
    deviceModel: "",
    systemVersion: "",
    appVersion: "",
    langCode: "en",
    systemLangCode: "en",
    channelPollInterval: 1000,
    channelPollRequestInterval: 250,
    channelPollConcurrency: 2,
    _securityChecks: true,
};

export abstract class TelegramBaseClient<S extends Session = Session> {
    /** The current teleproto version. */
    __version__ = version;
    /** @hidden */
    _config?: Api.Config;
    private _tzOffset: number;
    private readonly _pfs: boolean;
    private _configTimer?: ReturnType<typeof setTimeout>;
    /** @hidden */
    _appConfig?: { [key: string]: unknown };
    private _appConfigTask?: Promise<{ [key: string]: unknown }>;
    private _cdnKeysTask?: Promise<void>;
    /** @hidden */
    public _log: Logger;

    /** @hidden */
    public _floodSleepThreshold: number;
    public session: S;
    public apiHash: string;
    public apiId: number;

    /** @hidden */
    public _requestRetries: number;
    /** @hidden */
    public _downloadRetries: number;
    /** @hidden */
    public _connectionRetries: number;
    /** @hidden */
    public _reconnectRetries: number;
    /** @hidden */
    public _retryDelay: number;
    /** @hidden */
    public _timeout: number;
    /** @hidden */
    public _autoReconnect: boolean;
    /** @hidden */
    public _transport: ResolvedTransport;
    /** @deprecated The socket factory passed as `networkSocket`; use `transport`. */
    public networkSocket?: LegacySocketFactory;
    /** @hidden */
    public _initRequest: Api.InitConnection;
    /** @hidden */
    public _sender?: MTProtoSender;
    /** @hidden */
    public _floodWaitedRequests: any;
    /** @hidden */
    public _bot?: boolean;
    /** @hidden */
    public _premium?: boolean;
    /** @hidden */
    public _useIPV6: boolean;
    /** @hidden */
    public _testServers: boolean;
    /** @hidden */
    public _selfInputPeer?: Api.InputPeerUser;
    /** @hidden */
    public _errorHandler?: (error: Error) => Promise<void>;
    /** @hidden */
    public _eventBuilders: [EventBuilder, CallableFunction][];
    /** @hidden */
    public _entityCache: EntityCache;
    /** @hidden */
    public _channelPollInterval: number;
    /** @hidden */
    public _channelPollRequestInterval: number;
    /** @hidden */
    public _channelPollConcurrency: number;
    /** @hidden */
    public readonly _sequentialUpdates: boolean;
    public _lastRequest?: number;
    /**
     * Epoch ms of the last message decrypted on ANY session. Distinguishes a
     * genuinely dead main connection from a ping that merely timed out because
     * the single JS thread was busy decrypting media — if data is still
     * arriving, the stack is alive and a ping hiccup must not force a reconnect.
     * @hidden
     */
    public _lastReceivedAt = 0;
    /** @hidden */
    public _parseMode?: ParseInterface;
    /** @hidden */
    public _reCaptchaCallback?: (siteKey: string) => Promise<string>;
    /** @hidden */
    public _ALBUMS = new Map<
        string,
        [ReturnType<typeof setTimeout>, Api.TypeUpdate[]]
    >();
    /** All MTProto sessions, keyed by ShiftedDcId. @hidden */
    public _network!: SessionPool;
    /** @hidden */
    public _addresses!: DcAddressBook;
    /** File-part scheduler shared by downloads and uploads. @hidden */
    public _files!: FileTransfers;
    /**
     * Shared per-DC state (auth key + server salt).
     * Every sender of one DC reads/writes here so fresh sessions start with a
     * valid salt and share one auth key.
     * @hidden
     */
    public readonly _dcenters = new DcStateRegistry();
    /** @hidden */
    _destroyed: boolean;
    protected _updates?: ClientUpdates;
    private readonly _lifecycleHandlers = new Map<LifecycleEvent, Set<LifecycleHandler>>();
    private _connectionEvent: LifecycleEvent = "disconnect";
    private _destroyTask?: Promise<void>;
    /**
     * Retained for contract compatibility; concurrency of file transfers is
     * governed by the download pool (MediaScheduler), not this number.
     * @hidden
     */
    _maxConcurrentDownloads: number;
    /** @hidden */
    _securityChecks: boolean;
    /** @hidden */
    public _keepAliveInterval?: number;
    _connectedDeferred: Deferred<void>;
    /** Centralised pts/qts/seq tracker and gap recovery driver. */
    public updateManager!: UpdateManager;
    /** @hidden */
    _updateDispatcher!: UpdateDispatcher;
    /** @hidden */
    _updateLoop!: UpdateLoop;

    constructor(
        session: string | S,
        apiId: number,
        apiHash: string,
        clientParams: TelegramClientParams
    ) {
        clientParams = { ...clientParamsDefault, ...clientParams };
        if (!apiId || !apiHash) {
            throw new Error("Your API ID or Hash cannot be empty or undefined");
        }
        if (clientParams.baseLogger) {
            this._log = clientParams.baseLogger;
        } else {
            this._log = new Logger();
        }
        this._log.info(`Running teleproto version ${version} (crypto: ${IGE.backend()})`);
        if (session && typeof session == "string") {
            session = new StoreSession(session) as unknown as S;
        }
        if (!(session instanceof Session)) {
            throw new Error(
                "Only StringSession and StoreSessions are supported currently :( "
            );
        }
        this._floodSleepThreshold = clientParams.floodSleepThreshold!;
        this.session = session;
        this.apiId = apiId;
        this.apiHash = apiHash;
        this._useIPV6 = clientParams.useIPV6!;
        this._testServers = clientParams.testServers!;
        this._requestRetries = clientParams.requestRetries!;
        this._sequentialUpdates = !!clientParams.sequentialUpdates;
        this._downloadRetries = clientParams.downloadRetries!;
        this._connectionRetries = clientParams.connectionRetries!;
        this._reconnectRetries = clientParams.reconnectRetries!;
        this._retryDelay = clientParams.retryDelay || 0;
        this._channelPollInterval = clientParams.channelPollInterval!;
        this._channelPollRequestInterval = clientParams.channelPollRequestInterval!;
        this._channelPollConcurrency = clientParams.channelPollConcurrency!;
        for (const [name, value] of [
            ["channelPollInterval", this._channelPollInterval],
            ["channelPollRequestInterval", this._channelPollRequestInterval],
            ["channelPollConcurrency", this._channelPollConcurrency],
        ] as const) {
            if (!Number.isSafeInteger(value) || value <= 0) {
                throw new RangeError(`${name} must be a positive safe integer`);
            }
        }
        this._timeout = clientParams.timeout!;
        this._autoReconnect = clientParams.autoReconnect!;
        this._maxConcurrentDownloads = clientParams.maxConcurrentDownloads || 1;
        this._keepAliveInterval = clientParams.keepAliveInterval;
        this._reCaptchaCallback = clientParams.reCaptchaCallback;
        if (clientParams.connection && !(clientParams.connection instanceof Function)) {
            throw new Error("Connection should be a class not an instance");
        }
        if (clientParams.proxy && clientParams.transport) {
            throw new Error("Pass either transport or proxy, not both");
        }
        let connection = clientParams.connection;
        if (isLegacyProxyConnection(connection)) {
            this._log.warn("connection: proxy connection classes are deprecated: the proxy picks its own framing, remove the connection option");
            connection = undefined;
        }
        let transport: Transport;
        if (clientParams.networkSocket) {
            if (clientParams.transport) throw new Error("transport replaces networkSocket: pass only transport");
            this._log.warn(
                "networkSocket is deprecated: use the transport option (TcpTransport, WebSocketTransport, SocksTransport, HttpProxyTransport, MTProxyTransport) or your own Transport"
            );
            this.networkSocket = clientParams.networkSocket;
            transport = new LegacySocketTransport(clientParams.networkSocket, clientParams.proxy);
        } else {
            transport =
                clientParams.transport ??
                (clientParams.proxy ? proxyTransport(clientParams.proxy) : net.tcp ? new TcpTransport() : new WebSocketTransport());
        }
        const route = transport.resolve(connection);
        this._transport = route;
        const initProxy = route.clientProxy
            ? new Api.InputClientProxy(route.clientProxy)
            : undefined;
        this._initRequest = new Api.InitConnection({
            apiId: this.apiId,
            deviceModel:
                clientParams.deviceModel || system.deviceModel() || "Unknown",
            systemVersion:
                clientParams.systemVersion || system.systemVersion() || "1.0",
            appVersion: clientParams.appVersion || "1.0",
            langCode: clientParams.langCode || clientParamsDefault.langCode,
            langPack: clientParams.langPack || "",
            systemLangCode:
                clientParams.systemLangCode ||
                clientParamsDefault.systemLangCode,
            proxy: initProxy,
        });
        this._pfs = !!clientParams.pfs;
        const tzOffset = -new Date().getTimezoneOffset() * 60;
        this._tzOffset = Math.abs(tzOffset) >= 15 * 3600 ? 0 : Math.trunc(tzOffset / 900) * 900 || 0;
        this._eventBuilders = [];

        this._floodWaitedRequests = {};
        this._bot = undefined;
        this._selfInputPeer = undefined;
        this._securityChecks = !!clientParams.securityChecks;
        this._entityCache = new EntityCache(clientParams.entityCache);
        this._config = undefined;
        this._destroyed = false;
        this._connectedDeferred = new Deferred();

        this._parseMode = MarkdownParser;

        this.updateManager = new UpdateManager(this as unknown as TelegramClient);
        this._updateDispatcher = new UpdateDispatcher(this as unknown as TelegramClient);
        this._updateLoop = new UpdateLoop(this as unknown as TelegramClient);

        this._addresses = new DcAddressBook({
            testServers: this._testServers,
            webSocket: !!route.webSocket,
            proxied: !!route.proxied,
            ipv6: () => this._useIPV6,
        });
        this._network = new SessionPool(this, {
            idleTimeoutMs:
                clientParams.downloadPool?.idleTimeoutMs ??
                SESSION_IDLE_TIMEOUT_MS,
            sessionStartupDelayMs:
                clientParams.downloadPool?.sessionStartupDelayMs ??
                SESSION_STARTUP_DELAY_MS,
        });
        this._files = new FileTransfers(this, clientParams.downloadPool);
    }

    /**
     * The in-memory entity cache. Exposes `size`, `has`, `delete` and
     * `clear` so stale peers can be invalidated without touching internals.
     * See {@link TelegramClientParams.entityCache} for bounding it.
     */
    get entityCache(): EntityCache {
        return this._entityCache;
    }

    get floodSleepThreshold() {
        return this._floodSleepThreshold;
    }

    set floodSleepThreshold(value: number) {
        this._floodSleepThreshold = Math.min(value || 0, 24 * 60 * 60);
    }

    set maxConcurrentDownloads(value: number) {
        this._maxConcurrentDownloads = value;
    }

    // region connecting
    async _initSession() {
        await this.session.load();
        this.session.testServers = this._testServers;
        if (!this.session.serverAddress) {
            const dcId = this._testServers ? TEST_DEFAULT_DC_ID : PROD_DEFAULT_DC_ID;
            const seed = this._addresses.seed(dcId, this._useIPV6)!;
            this.session.setDC(dcId, seed.ipAddress, seed.port);
            return;
        }
        const sessionEnv = isTestDcAddress(this.session.serverAddress);
        if (sessionEnv !== undefined && sessionEnv !== this._testServers) {
            this._log.warn(
                `testServers mismatch: client constructed with testServers=${this._testServers}, ` +
                    `but the session's saved address (${this.session.serverAddress}) looks like ` +
                    `${sessionEnv ? "test" : "production"}. Sessions are not portable between ` +
                    `environments — use a separate session for each.`
            );
        }
        const webAddress = this.session.serverAddress.endsWith(".web.telegram.org");
        if (!webAddress) this._useIPV6 = this.session.serverAddress.includes(":");
        if (webAddress !== !!this._transport.webSocket) {
            const seed = this._addresses.seed(this.session.dcId, this._useIPV6);
            if (seed) this.session.setDC(this.session.dcId, seed.ipAddress, seed.port);
        }
    }

    get connected() {
        return this._sender && this._sender.isConnected();
    }

    /** Runs when the main sender starts connecting, including reconnections. */
    onConnecting(handler: LifecycleHandler): () => void {
        return this._subscribeLifecycle("connecting", handler);
    }

    /** Runs when the main transport connects; account sign-in may still be required. */
    onConnect(handler: LifecycleHandler): () => void {
        return this._subscribeLifecycle("connect", handler);
    }

    /** Runs when the main transport disconnects, manually or during recovery. */
    onDisconnect(handler: LifecycleHandler): () => void {
        return this._subscribeLifecycle("disconnect", handler);
    }

    /** Runs once when an automatic reconnect cycle starts. */
    onReconnecting(handler: LifecycleHandler): () => void {
        return this._subscribeLifecycle("reconnecting", handler);
    }

    /** Runs after automatic reconnection, the client probe and a catch-up attempt; does not await application handlers. */
    onReconnect(handler: LifecycleHandler): () => void {
        return this._subscribeLifecycle("reconnect", handler);
    }

    /** Runs once after client resources and subscriptions have been released. */
    onDestroy(handler: LifecycleHandler): () => void {
        return this._subscribeLifecycle("destroy", handler);
    }

    private _subscribeLifecycle(event: LifecycleEvent, handler: LifecycleHandler): () => void {
        if (typeof handler !== "function") throw new TypeError("Lifecycle handler must be a function");
        if (this._destroyed) throw new Error("Cannot subscribe to a destroyed client");
        let handlers = this._lifecycleHandlers.get(event);
        if (!handlers) this._lifecycleHandlers.set(event, handlers = new Set());
        handlers.add(handler);
        return () => { handlers!.delete(handler); };
    }

    /** @hidden */
    _handleConnectionLifecycle(event: "connecting" | "connect" | "disconnect" | "reconnecting"): void {
        if (this._destroyed && event !== "disconnect") return;
        if (event === this._connectionEvent) return;
        this._connectionEvent = event;
        this._emitLifecycle(event);
    }

    protected _emitLifecycle(event: LifecycleEvent): void {
        for (const handler of this._lifecycleHandlers.get(event) ?? []) {
            void Promise.resolve().then(() => {
                if (this._destroyed && event !== "destroy" && event !== "disconnect") return;
                return handler();
            }).catch(async (error) => {
                this._log.error(`${event} handler failed`, error);
                if (this._errorHandler) {
                    try {
                        await this._errorHandler(error);
                    } catch (handlerError) {
                        this._log.error("Lifecycle error handler failed", handlerError);
                    }
                }
            });
        }
    }

    async disconnect() {
        await this._disconnect();
        this._files.reset();
        await this._network.purge();
        this._teardownUpdateState();
    }

    /** @hidden */
    _teardownUpdateState() {
        for (const [timer] of this._ALBUMS.values()) {
            clearTimeout(timer);
        }
        this._ALBUMS.clear();

        this.updateManager.stop();

        for (const [builder] of this._eventBuilders) {
            builder.resolved = false;
        }
    }

    get disconnected() {
        return !this._sender || this._sender._disconnected;
    }

    async _disconnect() {
        this._updateLoop.stop();
        await this._sender?.disconnect();
    }

    /**
     * Disconnects all senders and removes all handlers
     * Disconnect is safer as it will not remove your event handlers
     */
    destroy(): Promise<void> {
        if (this._destroyTask) return this._destroyTask;
        this._destroyed = true;
        clearTimeout(this._configTimer);
        this._updateDispatcher.clear();
        this._destroyTask = (async () => {
            await this.disconnect();
            await this._network.close();
            this._eventBuilders = [];
            this._updates?._destroy();
            this._emitLifecycle("destroy");
            this._lifecycleHandlers.clear();
        })();
        return this._destroyTask;
    }

    /** @hidden */
    async _authKeyCallback(authKey: AuthKey | undefined, dcId: number) {
        if (this._addresses.isCdn(dcId)) return;
        if (authKey && dcId !== this.session.dcId) this._dcenters.get(dcId).authorized = false;
        this.session.setAuthKey(authKey, dcId);
        await this.session.save();
    }

    /** @hidden */
    _createConnection(address: DcAddress, dcId = address.id): Connection {
        return new this._transport.connection({
            ip: address.ipAddress,
            port: address.port,
            dcId: address.mediaOnly ? -dcId : dcId,
            loggers: this._log,
            socket: this._transport.socket,
            keepAliveInterval: this._keepAliveInterval,
            testServers: this._testServers,
        });
    }

    /** @hidden */
    _ensureCdnKeys(): Promise<void> {
        this._cdnKeysTask ??= this.invoke(new Api.help.GetCdnConfig())
            .then(async (config) => {
                for (const key of config.publicKeys) await addServerKey(key.publicKey);
            })
            .catch((error) => {
                this._cdnKeysTask = undefined;
                throw error;
            });
        return this._cdnKeysTask;
    }

    /** @hidden */
    async _connectSender(sender: MTProtoSender, dcId: number, connection?: Connection, mediaCluster = false) {
        try {
            if (!connection && this._addresses.isCdn(dcId)) {
                await this._ensureCdnKeys();
                const address = this._addresses.cdn(dcId);
                if (!address) throw new Error(`No address for CDN dc ${dcId}`);
                await sender.connect(this._createConnection(address));
                return sender;
            }
            connection ??= this._createConnection(await this.getDC(dcId, mediaCluster && !!sender.authKey.getKey()));
            await sender.connect(connection);
            if (dcId !== this.session.dcId) {
                await this._dcenters.get(dcId).authorize(async () => {
                    this._log.info(`Exporting authorization for data center ${dcId}`);
                    const auth = await this.invoke(new Api.auth.ExportAuthorization({ dcId }));
                    await sender.send(new Api.auth.ImportAuthorization({ id: auth.id, bytes: auth.bytes }));
                });
            }
            return sender;
        } catch (error) {
            if ((error as { errorMessage?: string }).errorMessage === "DC_ID_INVALID") return sender;
            this._addresses.fail(dcId, mediaCluster);
            await sender.disconnect().catch(() => {});
            throw error;
        }
    }

    /** @hidden */
    async _validateAuthKey(dcId: number, permAuthKey: AuthKey, template: Connection): Promise<boolean | undefined> {
        let failure: unknown;
        const sender = new MTProtoSender(new AuthKey(), {
            logger: this._log,
            dcId,
            client: this as unknown as TelegramClient,
            isMainSender: false,
            retries: 2,
            autoReconnect: false,
            connectTimeout: this._timeout,
            securityChecks: this._securityChecks,
            tempBinding: {
                permAuthKey,
                dcParam: this._testServers ? dcId + 10000 : dcId,
                expiresIn: 3600,
                onFailed: (error) => {
                    failure = error;
                },
            },
        });
        try {
            await sender.connect(template.clone());
            return failure === undefined ? true : undefined;
        } catch (error) {
            const message = ((failure ?? error) as { errorMessage?: string }).errorMessage;
            return message === "ENCRYPTED_MESSAGE_INVALID" ? false : undefined;
        } finally {
            await sender.disconnect().catch(() => {});
        }
    }

    /** @hidden */
    _getAppConfig(): Promise<{ [key: string]: unknown }> {
        this._appConfigTask ??= this.invoke(new Api.help.GetAppConfig({ hash: 0 }))
            .then((result) => {
                if (result instanceof Api.help.AppConfig) this._appConfig = jsonValue(result.config) as { [key: string]: unknown };
                return this._appConfig ?? {};
            })
            .catch((error) => {
                this._appConfigTask = undefined;
                this._log.debug(`help.getAppConfig failed: ${error}`);
                return this._appConfig ?? {};
            });
        return this._appConfigTask;
    }

    /** @hidden */
    _usePfs(): boolean {
        return this._pfs || (this._config?.tmpSessions ?? 0) > 1;
    }

    /** @hidden */
    _buildInitConnection(query: Api.AnyRequest): Api.InitConnection {
        const init = this._initRequest;
        const sendLang = !!init.langPack && !init.langCode.startsWith("X");
        return new Api.InitConnection({
            apiId: init.apiId,
            deviceModel: init.deviceModel,
            systemVersion: init.systemVersion,
            appVersion: init.appVersion,
            systemLangCode: init.systemLangCode,
            langPack: sendLang ? init.langPack : "",
            langCode: sendLang ? init.langCode || "en" : "",
            proxy: init.proxy,
            params: new Api.JsonObject({
                value: [
                    new Api.JsonObjectValue({
                        key: "tz_offset",
                        value: new Api.JsonNumber({ value: this._tzOffset }),
                    }),
                ],
            }),
            query,
        });
    }

    /** @hidden */
    _setConfig(config: Api.Config) {
        this._config = config;
        this._addresses.setOptions(config.dcOptions);
        const seconds = Math.min(Math.max(config.expires - config.date, 60), 86400);
        this._scheduleConfigReload(seconds * (1 - Math.random() * 0.2));
    }

    private _scheduleConfigReload(seconds: number) {
        clearTimeout(this._configTimer);
        if (this._destroyed) return;
        this._configTimer = setTimeout(() => void this._reloadConfig(), seconds * 1000);
        this._configTimer.unref?.();
    }

    /** @hidden */
    async _reloadConfig() {
        if (this._destroyed) return;
        try {
            this._setConfig(await this.invoke(new Api.help.GetConfig()));
        } catch (error) {
            this._log.warn(`help.getConfig failed, retrying in 60s: ${error}`);
            this._scheduleConfigReload(60);
        }
    }

    /** @hidden */
    _makeSender(
        dcId: number,
        onBreak: (dcId: number, reason?: ConnectionBreakReason) => void,
        authKey?: AuthKey,
        autoReconnect = true,
        tempBinding?: SenderTempBinding,
        media = false
    ): MTProtoSender {
        const dc = this._dcenters.get(dcId);
        return new MTProtoSender(authKey ?? this.session.getAuthKey(dcId), {
            logger: this._log,
            dcId,
            client: this as unknown as TelegramClient,
            isMainSender: false,
            retries: this._connectionRetries,
            reconnectRetries: this._reconnectRetries,
            autoReconnect: autoReconnect && this._autoReconnect,
            connectTimeout: this._timeout,
            securityChecks: this._securityChecks,
            authKeyCallback: this._authKeyCallback.bind(this),
            onConnectionBreak: onBreak,
            dcenter: dc,
            throttle: media ? dc.mediaThrottle : dc.throttle,
            tempBinding,
        });
    }

    /** @hidden */
    getSender(dcId: number): Promise<MTProtoSender> {
        return dcId
            ? this._network.getSession(dcId).ensureConnected()
            : Promise.resolve(this._sender!);
    }

    _leaseSender(dcId: number): Promise<SessionLease> {
        return dcId
            ? this._network.lease(dcId)
            : Promise.resolve({ sender: this._sender!, release: () => {} });
    }

    // endregion
    async getDC(dcId: number, download: boolean): Promise<DcAddress> {
        throw new Error("Cannot be called from here!");
    }

    invoke<R extends Api.AnyRequest>(request: R): Promise<R["__response"]> {
        throw new Error("Cannot be called from here!");
    }

    setLogLevel(level: LogLevel) {
        this._log.setLevel(level);
    }

    get logger() {
        return this._log;
    }

    /**
     * Custom error handler for the client
     * @example
     * ```ts
     * client.onError = async (error)=>{
     *         console.log("error is",error)
     *     }
     * ```
     */
    set onError(handler: (error: Error) => Promise<void>) {
        this._errorHandler = async (error: Error) => {
            try {
                await handler(error);
            } catch (e: any) {
                e.message = `Error ${e.message} thrown while handling top-level error: ${error.message}`;
                this._log.error(e.message, e);
            }
        };
    }
}
