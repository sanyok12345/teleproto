import { ObfuscatedConnection } from "./Connection";
import { AbridgedPacketCodec } from "./TCPAbridged";
import { generateRandomBytes, sha256 } from "../../Helpers";
import {
    Logger,
    PromisedNetSockets,
} from "../../extensions";
import { CTR } from "../../crypto/CTR";

/**
 * Base proxy configuration shared by all proxy types.
 */
interface BasicProxyInterface {
    /** Proxy server IP address. */
    ip: string;
    /** Proxy server port. */
    port: number;
    /** Connection timeout in seconds. Defaults to 5. */
    timeout?: number;
    /** Username for proxy authentication (SOCKS5 only). */
    username?: string;
    /** Password for proxy authentication (SOCKS5 only). */
    password?: string;
}

/**
 * Configuration for Telegram MTProxy connections.
 *
 * MTProxy is Telegram's own proxy protocol that obfuscates traffic to look like
 * regular HTTPS. When used, the client automatically switches to
 * {@link ConnectionTCPMTProxyAbridged} and notifies Telegram about the proxy
 * via `InputClientProxy` in the `InitConnection` request.
 *
 * @example
 * ```ts
 * const client = new TelegramClient(session, apiId, apiHash, {
 *     proxy: {
 *         MTProxy: true,
 *         ip: "178.62.232.110",
 *         port: 443,
 *         secret: "dd0123456789abcdef0123456789abcdef",
 *     },
 * });
 * ```
 */
export type MTProxyType = BasicProxyInterface & {
    /**
     * The proxy secret (hex or base64 encoded).
     * Must decode to exactly 16 bytes. Secrets prefixed with `dd` (fake-TLS)
     * are also supported — the leading byte is stripped automatically.
     */
    secret: string;
    /** Must be `true` to identify this as an MTProxy configuration. */
    MTProxy: true;
};

/**
 * Configuration for SOCKS4/SOCKS5 proxy connections.
 *
 * SOCKS proxies are handled at the socket level via the `socks` package and
 * work transparently with any connection type (Full, Abridged, Obfuscated).
 * SOCKS5 supports username/password authentication.
 *
 * @example
 * ```ts
 * // SOCKS5 with authentication
 * const client = new TelegramClient(session, apiId, apiHash, {
 *     proxy: {
 *         socksType: 5,
 *         ip: "127.0.0.1",
 *         port: 1080,
 *         username: "user",
 *         password: "pass",
 *     },
 * });
 *
 * // SOCKS4 (no authentication)
 * const client = new TelegramClient(session, apiId, apiHash, {
 *     proxy: {
 *         socksType: 4,
 *         ip: "127.0.0.1",
 *         port: 1080,
 *     },
 * });
 * ```
 */
export type SocksProxyType = BasicProxyInterface & {
    /** SOCKS protocol version: `4` for SOCKS4 or `5` for SOCKS5. */
    socksType: 4 | 5;
};

/**
 * Union type for all supported proxy configurations.
 *
 * Pass to `TelegramClientParams.proxy` to route all connections through a proxy.
 *
 * - {@link MTProxyType} — Telegram MTProxy (obfuscated, secret-based)
 * - {@link SocksProxyType} — SOCKS4/SOCKS5 (general-purpose, optional auth)
 */
export type ProxyInterface = MTProxyType | SocksProxyType;

/**
 * Handles the MTProxy obfuscation layer: generates the initial handshake header
 * and wraps all reads/writes in AES-CTR encryption keyed by the proxy secret.
 * @internal
 */
class MTProxyIO {
    header?: Buffer = undefined;
    private connection: PromisedNetSockets;
    private _encrypt?: CTR;
    private _decrypt?: CTR;
    private _packetClass: AbridgedPacketCodec;
    private _secret: Buffer;
    private _dcId: number;

    constructor(connection: TCPMTProxy) {
        this.connection = connection.socket;
        this._packetClass =
            connection.PacketCodecClass as unknown as AbridgedPacketCodec;

        this._secret = connection._secret;
        this._dcId = connection._dcId;
    }

    async initHeader() {
        let secret = this._secret;
        const isDD = secret.length == 17 && secret[0] == 0xdd;
        secret = isDD ? secret.slice(1) : secret;
        if (secret.length != 16) {
            throw new Error(
                "MTProxy secret must be a hex-string representing 16 bytes"
            );
        }
        const keywords = [
            Buffer.from("50567247", "hex"),
            Buffer.from("474554", "hex"),
            Buffer.from("504f5354", "hex"),
            Buffer.from("eeeeeeee", "hex"),
        ];
        let random;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            random = generateRandomBytes(64);
            if (
                random[0] !== 0xef &&
                !random.slice(4, 8).equals(Buffer.alloc(4))
            ) {
                let ok = true;
                for (const key of keywords) {
                    if (key.equals(random.slice(0, 4))) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    break;
                }
            }
        }
        random = random.toJSON().data;
        const randomReversed = Buffer.from(random.slice(8, 56)).reverse();
        // Encryption has "continuous buffer" enabled
        const encryptKey = await sha256(
            Buffer.concat([Buffer.from(random.slice(8, 40)), secret])
        );
        const encryptIv = Buffer.from(random.slice(40, 56));

        const decryptKey = await sha256(
            Buffer.concat([Buffer.from(randomReversed.slice(0, 32)), secret])
        );
        const decryptIv = Buffer.from(randomReversed.slice(32, 48));

        const encryptor = new CTR(encryptKey, encryptIv);
        const decryptor = new CTR(decryptKey, decryptIv);
        random = Buffer.concat([
            Buffer.from(random.slice(0, 56)),
            this._packetClass.obfuscateTag,
            Buffer.from(random.slice(60)),
        ]);
        const dcIdBytes = Buffer.alloc(2);
        dcIdBytes.writeInt8(this._dcId, 0);
        random = Buffer.concat([
            Buffer.from(random.slice(0, 60)),
            dcIdBytes,
            Buffer.from(random.slice(62)),
        ]);
        random = Buffer.concat([
            Buffer.from(random.slice(0, 56)),
            Buffer.from(encryptor.encrypt(random).slice(56, 64)),
            Buffer.from(random.slice(64)),
        ]);
        this.header = random;

        this._encrypt = encryptor;
        this._decrypt = decryptor;
    }

    async read(n: number) {
        const data = await this.connection.readExactly(n);
        return this._decrypt!.encrypt(data);
    }

    write(data: Buffer) {
        this.connection.write(this._encrypt!.encrypt(data));
    }
}

interface TCPMTProxyInterfaceParams {
    ip: string;
    port: number;
    dcId: number;
    loggers: Logger;
    proxy: ProxyInterface;
    socket: typeof PromisedNetSockets;
}

/**
 * Connection that routes traffic through a Telegram MTProxy server.
 *
 * Connects to the proxy address (not Telegram directly), performs the
 * MTProxy obfuscated handshake using the provided secret, and then tunnels
 * all MTProto traffic through the proxy with AES-CTR encryption.
 *
 * Not intended to be used directly — use {@link ConnectionTCPMTProxyAbridged} instead,
 * or simply pass an {@link MTProxyType} config to `TelegramClientParams.proxy`
 * and the client will select the correct connection class automatically.
 */
export class TCPMTProxy extends ObfuscatedConnection {
    ObfuscatedIO = MTProxyIO;

    _secret: Buffer;

    constructor({
        ip,
        port,
        dcId,
        loggers,
        proxy,
        socket,
    }: TCPMTProxyInterfaceParams) {
        super({
            ip: proxy.ip,
            port: proxy.port,
            dcId: dcId,
            loggers: loggers,
            socket: socket,
            proxy: proxy,
        });
        if (!("MTProxy" in proxy)) {
            throw new Error("This connection only supports MPTProxies");
        }
        if (!proxy.secret) {
            throw new Error("You need to provide the secret for the MTProxy");
        }
        if (proxy.secret && proxy.secret.match(/^[0-9a-f]+$/i)) {
            // probably hex
            this._secret = Buffer.from(proxy.secret, "hex");
        } else {
            // probably b64
            this._secret = Buffer.from(proxy.secret, "base64");
        }
    }
}

/**
 * MTProxy connection using the Abridged packet codec.
 *
 * This is the connection class automatically selected when `proxy.MTProxy` is `true`.
 */
export class ConnectionTCPMTProxyAbridged extends TCPMTProxy {
    PacketCodecClass = AbridgedPacketCodec;
}
