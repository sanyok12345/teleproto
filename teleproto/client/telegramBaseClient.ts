import { Connection } from "../network";
import { TelegramClient } from "./TelegramClient";
import { version } from "../Version";
import {
    ConnectionTCPFull,
    ConnectionTCPObfuscated,
} from "../network/connection";
import { Session, StoreSession } from "../sessions";
import { Logger, PromisedNetSockets } from "../extensions";
import { Api } from "../tl";

import os from "os";
import type { AuthKey } from "../crypto/AuthKey";
import { EntityCache } from "../entityCache";
import type { EntityCacheOptions } from "../entityCache";
import type { ParseInterface } from "./messageParse";
import type { EventBuilder } from "../events/common";
import { MarkdownParser } from "../extensions/markdown";
import { MTProtoSender } from "../network";
import { DcenterRegistry } from "../network/Dcenter";
import { Network } from "../network/Network";
import type { SessionLease } from "../network/Network";
import {
    MediaScheduler,
    MediaSchedulerOptions,
} from "../network/MediaScheduler";
import { LAYER } from "../tl/runtime/registry";
import {
    ConnectionTCPMTProxyAbridged,
    ProxyInterface,
} from "../network/connection/TCPMTProxy";
import { LogLevel } from "../extensions/Logger";
import Deferred from "../extensions/Deferred";
import { UpdateManager } from "./UpdateManager";

// An idle media session is torn down and rebuilt lazily on next use (the
// main session never idles — it pings). With per-connection PFS keys a
// rebuild costs a full DH handshake (network + server time, ~0.5-1s), so
// the reclaim window follows mtcute's 60s rather than tdesktop's 15s —
// bursty traffic (one photo per minute) stays warm instead of paying the
// handshake on every burst.
const SESSION_IDLE_TIMEOUT_MS = 60_000;
const SESSION_STARTUP_DELAY_MS = 800;

const PROD_DEFAULT_DC_ID = 2;
const TEST_DEFAULT_DC_ID = 2;

export const PROD_DC_IPV4: { readonly [id: number]: string } = {
    1: "149.154.175.50",
    2: "149.154.167.51",
    3: "149.154.175.100",
    4: "149.154.167.91",
    5: "149.154.171.5",
};
export const PROD_DC_IPV6: { readonly [id: number]: string } = {
    1: "2001:0b28:f23d:f001:0000:0000:0000:000a",
    2: "2001:067c:04e8:f002:0000:0000:0000:000a",
    3: "2001:0b28:f23d:f003:0000:0000:0000:000a",
    4: "2001:067c:04e8:f004:0000:0000:0000:000a",
    5: "2001:0b28:f23f:f005:0000:0000:0000:000a",
};
export const TEST_DC_IPV4: { readonly [id: number]: string } = {
    1: "149.154.175.10",
    2: "149.154.167.40",
    3: "149.154.175.117",
};
export const TEST_DC_IPV6: { readonly [id: number]: string } = {
    1: "2001:0b28:f23d:f001:0000:0000:0000:000e",
    2: "2001:067c:04e8:f002:0000:0000:0000:000e",
    3: "2001:0b28:f23d:f003:0000:0000:0000:000e",
};
const DC_PORT = 443;

/**
 * Returns `true` if `address` is a known test-DC seed, `false` if it's a known
 * production-DC seed, and `undefined` if the address isn't recognised (custom
 * DC, IPv6 we haven't tabulated, post-`help.GetConfig` rebalanced address, etc.).
 */
function inferSessionEnv(address: string): boolean | undefined {
    for (const ip of Object.values(TEST_DC_IPV4)) if (ip === address) return true;
    for (const ip of Object.values(TEST_DC_IPV6)) if (ip === address) return true;
    for (const ip of Object.values(PROD_DC_IPV4)) if (ip === address) return false;
    for (const ip of Object.values(PROD_DC_IPV6)) if (ip === address) return false;
    return undefined;
}

/**
 * Interface for creating a new client.
 * All of these have a default value and you should only change those if you know what you are doing.
 */
export interface TelegramClientParams {
    /** The connection instance to be used when creating a new connection to the servers. It must be a type.<br/>
    * Defaults to {@link ConnectionTCPFull}.
     */
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
     * Proxy configuration for routing all connections through a proxy server.
     *
     * Supports two proxy types:
     * - **MTProxy** (`{ MTProxy: true, ip, port, secret }`) — Telegram's own obfuscated proxy.
     *   Automatically switches the connection to {@link ConnectionTCPMTProxyAbridged}.
     * - **SOCKS4/5** (`{ socksType: 4 | 5, ip, port }`) — general-purpose SOCKS proxy.
     *   SOCKS5 supports optional `username`/`password` authentication.
     *
     * @see {@link ProxyInterface} for detailed type definitions and examples.
     */
    proxy?: ProxyInterface;
    /**
     * How many times we should retry borrowing a sender from another DC when it fails. defaults to 5
     */
    downloadRetries?: number;
    /** The delay in milliseconds to sleep between automatic reconnections. defaults to 1000*/
    retryDelay?: number;
    /**Whether reconnection should be retried connection_retries times automatically if Telegram disconnects us or not. defaults to true */
    autoReconnect?: boolean;
    /** does nothing for now */
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
     * What type of network connection to use.
     */
    networkSocket?: typeof PromisedNetSockets;
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
    downloadPool?: Partial<MediaSchedulerOptions> & {
        inflightPerDc?: number;
        maxSessions?: number;
        sessions?: number;
        idleTimeoutMs?: number;
        sessionStartupDelayMs?: number;
    };
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
    connection: ConnectionTCPFull,
    networkSocket: PromisedNetSockets,
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
    _securityChecks: true,
};

export abstract class TelegramBaseClient {
    /** The current teleproto version. */
    __version__ = version;
    /** @hidden */
    _config?: Api.Config;
    /** @hidden */
    _appConfig?: { [key: string]: any };
    /** @hidden */
    public _log: Logger;

    /** @hidden */
    public _floodSleepThreshold: number;
    public session: Session;
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
    public _connection: typeof Connection;
    /** @hidden */
    public _initRequest: Api.InitConnection;
    /** @hidden */
    public _sender?: MTProtoSender;
    /** @hidden */
    public _floodWaitedRequests: any;
    /** @hidden */
    public _bot?: boolean;
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
    /** All MTProto sessions, keyed by ShiftedDcId (tdesktop's Instance). @hidden */
    public _network!: Network;
    /**
     * Connect failures per `"dcId:mediaCluster"`, used to rotate through a
     * DC's published addresses — one dead IP must not blackhole the DC.
     * @hidden
     */
    public _dcConnectFailures = new Map<string, number>();
    /** File-part scheduler shared by downloads and uploads. @hidden */
    public _media!: MediaScheduler;
    /**
     * Shared per-DC state (auth key + server salt), tdesktop's `Dcenter`.
     * Every sender of one DC reads/writes here so fresh sessions start with a
     * valid salt and share one auth key.
     * @hidden
     */
    public readonly _dcenters = new DcenterRegistry();
    /** @hidden */
    _loopStarted: boolean;
    /** @hidden */
    _reconnecting: boolean;
    /** @hidden */
    _destroyed: boolean;
    /** @hidden */
    _isSwitchingDc: boolean;
    /** @hidden */
    protected _proxy?: ProxyInterface;
    /**
     * Retained for contract compatibility; concurrency of file transfers is
     * governed by the download pool (MediaScheduler), not this number.
     * @hidden
     */
    _maxConcurrentDownloads: number;
    /** @hidden */
    _securityChecks: boolean;
    public networkSocket: typeof PromisedNetSockets;
    /** @hidden */
    public _keepAliveInterval?: number;
    _connectedDeferred: Deferred<void>;
    /** Centralised pts/qts/seq tracker and gap recovery driver. */
    public updateManager!: UpdateManager;

    constructor(
        session: string | Session,
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
        this._log.info("Running teleproto version " + version);
        if (session && typeof session == "string") {
            session = new StoreSession(session);
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
        this._downloadRetries = clientParams.downloadRetries!;
        this._connectionRetries = clientParams.connectionRetries!;
        this._reconnectRetries = clientParams.reconnectRetries!;
        this._retryDelay = clientParams.retryDelay || 0;
        this._timeout = clientParams.timeout!;
        this._autoReconnect = clientParams.autoReconnect!;
        this._proxy = clientParams.proxy;
        this._maxConcurrentDownloads = clientParams.maxConcurrentDownloads || 1;
        this.networkSocket = clientParams.networkSocket || PromisedNetSockets;
        this._keepAliveInterval = clientParams.keepAliveInterval;
        this._reCaptchaCallback = clientParams.reCaptchaCallback;
        if (!(clientParams.connection instanceof Function)) {
            throw new Error("Connection should be a class not an instance");
        }
        this._connection = clientParams.connection;
        let initProxy;
        if (this._proxy && "MTProxy" in this._proxy) {
            this._connection = ConnectionTCPMTProxyAbridged;
            initProxy = new Api.InputClientProxy({
                address: this._proxy.ip,
                port: this._proxy.port,
            });
        }
        this._initRequest = new Api.InitConnection({
            apiId: this.apiId,
            deviceModel:
                clientParams.deviceModel || os.type().toString() || "Unknown",
            systemVersion:
                clientParams.systemVersion || os.release().toString() || "1.0",
            appVersion: clientParams.appVersion || "1.0",
            langCode: clientParams.langCode || clientParamsDefault.langCode,
            langPack: "", // this should be left empty.
            systemLangCode:
                clientParams.systemLangCode ||
                clientParamsDefault.systemLangCode,
            proxy: initProxy,
        });
        this._eventBuilders = [];

        this._floodWaitedRequests = {};
        this._bot = undefined;
        this._selfInputPeer = undefined;
        this._securityChecks = !!clientParams.securityChecks;
        this._entityCache = new EntityCache(clientParams.entityCache);
        this._config = undefined;
        this._loopStarted = false;
        this._reconnecting = false;
        this._destroyed = false;
        this._isSwitchingDc = false;
        this._connectedDeferred = new Deferred();

        this._parseMode = MarkdownParser;

        this.updateManager = new UpdateManager(this as unknown as TelegramClient);

        this._network = new Network(this, {
            idleTimeoutMs:
                clientParams.downloadPool?.idleTimeoutMs ??
                SESSION_IDLE_TIMEOUT_MS,
            sessionStartupDelayMs:
                clientParams.downloadPool?.sessionStartupDelayMs ??
                SESSION_STARTUP_DELAY_MS,
        });
        this._media = new MediaScheduler(
            this,
            this._network,
            clientParams.downloadPool
        );
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
        if (!this.session.serverAddress) {
            this.session.testServers = this._testServers;
            const dcId = this._testServers
                ? TEST_DEFAULT_DC_ID
                : PROD_DEFAULT_DC_ID;
            const ipv4Table = this._testServers ? TEST_DC_IPV4 : PROD_DC_IPV4;
            const ipv6Table = this._testServers ? TEST_DC_IPV6 : PROD_DC_IPV6;
            this.session.setDC(
                dcId,
                this._useIPV6 ? ipv6Table[dcId] : ipv4Table[dcId],
                DC_PORT
            );
        } else {
            // Best-effort environment check: infer the session's environment from its
            // saved DC IP and warn if it disagrees with `clientParams.testServers`.
            // We can't do better without persisting the flag, and we don't want to
            // change the on-disk session format.
            const sessionEnv = inferSessionEnv(this.session.serverAddress);
            if (sessionEnv !== undefined && sessionEnv !== this._testServers) {
                this._log.warn(
                    `testServers mismatch: client constructed with testServers=${this._testServers}, ` +
                    `but the session's saved address (${this.session.serverAddress}) looks like ` +
                    `${sessionEnv ? "test" : "production"}. Sessions are not portable between ` +
                    `environments — use a separate session for each.`
                );
            }
            this.session.testServers = this._testServers;
            this._useIPV6 = this.session.serverAddress.includes(":");
        }
    }

    get connected() {
        return this._sender && this._sender.isConnected();
    }

    async disconnect() {
        await this._disconnect();
        await this._media.purge();
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
        this._loopStarted = false;
        await this._sender?.disconnect();
    }

    /**
     * Disconnects all senders and removes all handlers
     * Disconnect is safer as it will not remove your event handlers
     */
    async destroy() {
        this._destroyed = true;
        await this.disconnect();
        await this._media.close();
        await this._network.close();
        this._eventBuilders = [];
    }

    /** @hidden */
    async _authKeyCallback(authKey: AuthKey | undefined, dcId: number) {
        this.session.setAuthKey(authKey, dcId);
        await this.session.save();
    }

    async _connectSender(
        sender: MTProtoSender,
        dcId: number,
        connection?: Connection,
        mediaCluster: boolean = false
    ) {
        const useMediaCluster = mediaCluster && !!sender.authKey.getKey();
        if (!connection) {
            const dc = await this.getDC(dcId, useMediaCluster);
            connection = new this._connection({
                ip: dc.ipAddress,
                port: dc.port,
                dcId: dcId,
                loggers: this._log,
                proxy: this._proxy,
                socket: this.networkSocket,
                keepAliveInterval: this._keepAliveInterval,
            });
        }
        try {
            const needAuth =
                this.session.dcId !== dcId && !sender._authenticated;
            let innerQuery: Api.AnyRequest;
            if (needAuth) {
                this._log.info(
                    `Exporting authorization for data center ${dcId} with layer ${LAYER}`
                );
                const auth = await this.invoke(
                    new Api.auth.ExportAuthorization({ dcId: dcId })
                );
                innerQuery = new Api.auth.ImportAuthorization({
                    id: auth.id,
                    bytes: auth.bytes,
                });
            } else {
                innerQuery = new Api.help.GetConfig();
            }

            await sender.connect(connection, false);

            const initConn = new Api.InitConnection({
                apiId: this._initRequest.apiId,
                deviceModel: this._initRequest.deviceModel,
                systemVersion: this._initRequest.systemVersion,
                appVersion: this._initRequest.appVersion,
                langCode: this._initRequest.langCode,
                langPack: this._initRequest.langPack,
                systemLangCode: this._initRequest.systemLangCode,
                proxy: this._initRequest.proxy,
                query: innerQuery,
            });
            await sender.send(
                new Api.InvokeWithLayer({ layer: LAYER, query: initConn })
            );
            sender._authenticated = true;
            sender._needsInitConnection = false;
            return sender;
        } catch (err: any) {
            if (err.errorMessage === "DC_ID_INVALID") {
                sender._authenticated = true;
                sender.userDisconnected = false;
                return sender;
            }
            const failKey = `${dcId}:${useMediaCluster}`;
            this._dcConnectFailures.set(
                failKey,
                (this._dcConnectFailures.get(failKey) ?? 0) + 1
            );
            sender.disconnect().catch(() => {});
            throw err;
        }
    }

    /** @hidden */
    _makeSender(
        dcId: number,
        onBreak: (dcId: number) => void,
        authKey?: AuthKey,
        autoReconnect: boolean = true,
        tempBinding?: import("../network/MTProtoSender").SenderTempBinding,
    ): MTProtoSender {
        return new MTProtoSender(authKey ?? this.session.getAuthKey(dcId), {
            logger: this._log,
            dcId,
            retries: this._connectionRetries,
            delay: this._retryDelay,
            autoReconnect: autoReconnect && this._autoReconnect,
            connectTimeout: this._timeout,
            authKeyCallback: this._authKeyCallback.bind(this),
            isMainSender: false,
            onConnectionBreak: onBreak,
            client: this as unknown as TelegramClient,
            securityChecks: this._securityChecks,
            reconnectRetries: this._reconnectRetries,
            dcenter: this._dcenters.get(dcId),
            tempBinding,
        });
    }

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
    async getDC(
        dcId: number,
        download: boolean
    ): Promise<{ id: number; ipAddress: string; port: number }> {
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
