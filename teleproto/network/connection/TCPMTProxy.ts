import { createHmac } from "node:crypto";

import { ObfuscatedConnection } from "./Connection";
import { AbridgedPacketCodec } from "./TCPAbridged";
import { generateRandomBytes, sha256 } from "../../Helpers";
import { Logger, PromisedNetSockets } from "../../extensions";
import { CTR } from "../../crypto/CTR";

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
     * The proxy secret (hex or base64 encoded). Three formats are accepted:
     * - 16-byte plain secret.
     * - 17 bytes with a leading `dd` byte — random-padding mode.
     * - A leading `ee` byte + 16 bytes of secret + UTF-8 SNI domain bytes —
     *   fake-TLS mode. The connection is wrapped in a spoofed TLS 1.2
     *   handshake and all MTProxy bytes are tunneled inside TLS
     *   application_data records.
     */
    secret: string;
    /** Must be `true` to identify this as an MTProxy configuration. */
    MTProxy: true;
};

/**
 * Configuration for SOCKS4/SOCKS5 proxy connections.
 *
 * SOCKS proxies are handled at the socket level via the `socks` package and
 * work transparently with any connection type. SOCKS5 supports username/
 * password authentication.
 *
 * @example
 * ```ts
 * const client = new TelegramClient(session, apiId, apiHash, {
 *     proxy: {
 *         socksType: 5,
 *         ip: "127.0.0.1",
 *         port: 1080,
 *         username: "user",
 *         password: "pass",
 *     },
 * });
 * ```
 */
export type SocksProxyType = BasicProxyInterface & {
    /** SOCKS protocol version: `4` for SOCKS4 or `5` for SOCKS5. */
    socksType: 4 | 5;
};

/**
 * Union type for all supported proxy configurations. Pass to
 * `TelegramClientParams.proxy` to route all connections through a proxy.
 */
export type ProxyInterface = MTProxyType | SocksProxyType;

interface TCPMTProxyInterfaceParams {
    ip: string;
    port: number;
    dcId: number;
    loggers: Logger;
    proxy: ProxyInterface;
    socket: typeof PromisedNetSockets;
}

const SECRET_LEN = 16;
const PREFIX_FAKE_TLS = 0xee;
const PREFIX_DD_PADDING = 0xdd;

interface ParsedSecret {
    key: Buffer;
    fakeTlsDomain?: string;
}

function decodeSecret(input: string): Buffer {
    return /^[0-9a-f]+$/i.test(input)
        ? Buffer.from(input, "hex")
        : Buffer.from(input, "base64");
}

function parseProxySecret(input: string | undefined): ParsedSecret {
    if (!input) {
        throw new Error("MTProxy: secret is required");
    }
    const raw = decodeSecret(input);

    if (raw.length > 1 + SECRET_LEN && raw[0] === PREFIX_FAKE_TLS) {
        return {
            key: Buffer.from(raw.subarray(1, 1 + SECRET_LEN)),
            fakeTlsDomain: raw.subarray(1 + SECRET_LEN).toString("utf8"),
        };
    }
    if (raw.length === 1 + SECRET_LEN && raw[0] === PREFIX_DD_PADDING) {
        return { key: Buffer.from(raw.subarray(1)) };
    }
    if (raw.length === SECRET_LEN) {
        return { key: raw };
    }
    throw new Error(
        `MTProxy: secret must be ${SECRET_LEN} bytes, ` +
            `${1 + SECRET_LEN} with 0xdd prefix, ` +
            `or 0xee + ${SECRET_LEN} bytes + domain — got ${raw.length} bytes`
    );
}

const OBF_HEADER_LEN = 64;
const OBF_TAG_OFFSET = 56;
const OBF_DC_OFFSET = 60;

/** Header prefixes that collide with HTTP or other protocol sniffers. */
const FORBIDDEN_HEADER_PREFIXES: ReadonlyArray<Buffer> = [
    Buffer.from("50567247", "hex"),
    Buffer.from("474554", "hex"),
    Buffer.from("504f5354", "hex"),
    Buffer.from("eeeeeeee", "hex"),
];

function pickObfuscationHeader(): Buffer {
    while (true) {
        const candidate = generateRandomBytes(OBF_HEADER_LEN);
        if (candidate[0] === 0xef) continue;
        if (candidate.subarray(4, 8).equals(Buffer.alloc(4))) continue;
        const head4 = candidate.subarray(0, 4);
        if (FORBIDDEN_HEADER_PREFIXES.some((p) => p.equals(head4))) continue;
        return candidate;
    }
}

interface ByteStream {
    readExactly(n: number): Promise<Buffer>;
    write(data: Buffer): void;
}

/**
 * Generates the MTProxy obfuscation header and wraps every subsequent
 * read/write in AES-CTR. MTProxy derives mirrored CTR streams from the same
 * 64-byte header — bytes 8..56 supply the client→server key/iv, and the
 * reversed copy supplies the server→client side.
 *
 * @internal
 */
class MTProxyIO {
    header?: Buffer;

    private readonly stream: ByteStream;
    private readonly packetCodec: AbridgedPacketCodec;
    private readonly secret: Buffer;
    private readonly dcId: number;
    private encryptor?: CTR;
    private decryptor?: CTR;

    constructor(connection: TCPMTProxy) {
        this.stream = connection.socket;
        this.packetCodec =
            connection.PacketCodecClass as unknown as AbridgedPacketCodec;
        this.secret = connection._secret;
        this.dcId = connection._dcId;
    }

    async initHeader(): Promise<void> {
        if (this.secret.length !== SECRET_LEN) {
            throw new Error(
                `MTProxy: secret must be ${SECRET_LEN} bytes, got ${this.secret.length}`
            );
        }

        const header = pickObfuscationHeader();
        const reversed = Buffer.from(header.subarray(8, 56)).reverse();

        const encryptKey = await sha256(
            Buffer.concat([header.subarray(8, 40), this.secret])
        );
        const encryptIv = Buffer.from(header.subarray(40, 56));
        const decryptKey = await sha256(
            Buffer.concat([reversed.subarray(0, 32), this.secret])
        );
        const decryptIv = Buffer.from(reversed.subarray(32, 48));

        this.encryptor = new CTR(encryptKey, encryptIv);
        this.decryptor = new CTR(decryptKey, decryptIv);

        // Stamp protocol tag and DC id (low byte first, byte 61 zeroed —
        // matches gramjs / official client behavior, even for negative DC ids).
        this.packetCodec.obfuscateTag.copy(header, OBF_TAG_OFFSET);
        header.writeInt8(this.dcId, OBF_DC_OFFSET);
        header[OBF_DC_OFFSET + 1] = 0;

        // Re-encrypt the stamped tail in place — the CTR counter ends up
        // advanced by all 64 bytes, matching the server's view.
        const encryptedTail = this.encryptor
            .encrypt(header)
            .subarray(OBF_TAG_OFFSET, OBF_HEADER_LEN);
        encryptedTail.copy(header, OBF_TAG_OFFSET);

        this.header = header;
    }

    async read(n: number): Promise<Buffer> {
        const data = await this.stream.readExactly(n);
        return this.decryptor!.encrypt(data);
    }

    readExactly(n: number): Promise<Buffer> {
        return this.read(n);
    }

    write(data: Buffer): void {
        this.stream.write(this.encryptor!.encrypt(data));
    }
}

const TLS_RECORD_HEADER_LEN = 5;
const TLS_RECORD_MAX_PAYLOAD = 16384;

const TLS_RECORD_HANDSHAKE = 0x16;
const TLS_RECORD_CHANGE_CIPHER_SPEC = 0x14;
const TLS_RECORD_APPLICATION_DATA = 0x17;

const TLS_APP_DATA_PREFIX = Buffer.from([0x17, 0x03, 0x03]);

const FAKE_TLS_HELLO_SIZE = 517;
const FAKE_TLS_HELLO_RANDOM_OFFSET = 11;
const FAKE_TLS_HELLO_RANDOM_LEN = 32;
/** 5-byte TLS record + 4-byte handshake header + 2-byte version = 114. */
const FAKE_TLS_FIXED_HEADER_SIZE = 114;
const FAKE_TLS_RANDOM_TIMESTAMP_XOR_OFFSET = 28;

const GREASE = 0x0a;

interface TlsRecord {
    type: number;
    payload: Buffer;
}

async function readTlsRecord(stream: ByteStream): Promise<TlsRecord> {
    const hdr = await stream.readExactly(TLS_RECORD_HEADER_LEN);
    const type = hdr[0];
    const len = hdr.readUInt16BE(3);
    const payload = await stream.readExactly(len);
    return { type, payload };
}

function tlsRecordTypeName(type: number): string {
    switch (type) {
        case TLS_RECORD_HANDSHAKE:
            return "Handshake";
        case TLS_RECORD_CHANGE_CIPHER_SPEC:
            return "ChangeCipherSpec";
        case TLS_RECORD_APPLICATION_DATA:
            return "ApplicationData";
        default:
            return `0x${type.toString(16).padStart(2, "0")}`;
    }
}

function tlsExtension(type: number, body: ArrayLike<number> | Buffer): Buffer {
    const content = Buffer.isBuffer(body) ? body : Buffer.from(body);
    const out = Buffer.alloc(4 + content.length);
    out.writeUInt16BE(type, 0);
    out.writeUInt16BE(content.length, 2);
    content.copy(out, 4);
    return out;
}

function sniExtension(domain: string): Buffer {
    const dom = Buffer.from(domain, "utf8");
    const body = Buffer.alloc(5 + dom.length);
    body.writeUInt16BE(dom.length + 3, 0);
    body.writeUInt8(0x00, 2);
    body.writeUInt16BE(dom.length, 3);
    dom.copy(body, 5);
    return tlsExtension(0x0000, body);
}

function keyShareExtension(): Buffer {
    const x25519Pub = generateRandomBytes(32);
    const entries = Buffer.concat([
        Buffer.from([GREASE, GREASE, 0x00, 0x01, 0x00]),
        Buffer.from([0x00, 0x1d, 0x00, 0x20]),
        x25519Pub,
    ]);
    const body = Buffer.alloc(2 + entries.length);
    body.writeUInt16BE(entries.length, 0);
    entries.copy(body, 2);
    return tlsExtension(0x0033, body);
}

/**
 * Input-independent extensions in Chrome 105+ order. SNI and key_share are
 * spliced in at runtime (see `buildClientHello`). Layout is intentionally
 * stable for JA3 fingerprint similarity.
 */
const STATIC_EXTENSIONS: ReadonlyArray<Buffer> = [
    tlsExtension(0x0a0a, []),
    tlsExtension(0x0017, []),
    tlsExtension(0xff01, [0x00]),
    tlsExtension(0x000a, [
        0x00, 0x08, GREASE, GREASE, 0x00, 0x1d, 0x00, 0x17, 0x00, 0x18,
    ]),
    tlsExtension(0x000b, [0x01, 0x00]),
    tlsExtension(0x0023, []),
    tlsExtension(0x0010, [
        0x00, 0x0c, 0x02, 0x68, 0x32, 0x08, 0x68, 0x74, 0x74, 0x70, 0x2f, 0x31,
        0x2e, 0x31,
    ]),
    tlsExtension(0x0005, [0x01, 0x00, 0x00, 0x00, 0x00]),
    tlsExtension(0x000d, [
        0x00, 0x10, 0x04, 0x03, 0x08, 0x04, 0x04, 0x01, 0x05, 0x03, 0x08, 0x05,
        0x05, 0x01, 0x08, 0x06, 0x06, 0x01,
    ]),
    tlsExtension(0x0012, []),
    tlsExtension(0x002d, [0x01, 0x01]),
    tlsExtension(0x002b, [0x06, GREASE, GREASE, 0x03, 0x04, 0x03, 0x03]),
    tlsExtension(0x001b, [0x02, 0x00, 0x02]),
    tlsExtension(0x0a0a, [0x00]),
];
const STATIC_EXTENSIONS_LEN = STATIC_EXTENSIONS.reduce(
    (s, e) => s + e.length,
    0
);

const CIPHER_SUITES = Buffer.from([
    GREASE, GREASE,
    0x13, 0x01, 0x13, 0x02, 0x13, 0x03,
    0xc0, 0x2b, 0xc0, 0x2f, 0xc0, 0x2c, 0xc0, 0x30,
    0xcc, 0xa9, 0xcc, 0xa8,
    0xc0, 0x13, 0xc0, 0x14,
    0x00, 0x9c, 0x00, 0x9d, 0x00, 0x2f, 0x00, 0x35,
]);

/**
 * Builds the 517-byte Chrome-like TLS 1.2 ClientHello. The 32-byte `random`
 * field at offset 11 is left zeroed — the caller stamps it with the
 * HMAC-derived value before sending.
 */
function buildClientHello(domain: string, sessionId: Buffer): Buffer {
    const sni = sniExtension(domain);
    const keyShare = keyShareExtension();

    let extensionsLen = STATIC_EXTENSIONS_LEN + sni.length + keyShare.length;
    const paddingPayloadLen =
        FAKE_TLS_HELLO_SIZE - FAKE_TLS_FIXED_HEADER_SIZE - extensionsLen - 4;
    if (paddingPayloadLen < 0) {
        throw new Error(
            `FakeTLS: domain too long (${domain.length} bytes); ClientHello overflows by ${-paddingPayloadLen} bytes`
        );
    }
    const padding = tlsExtension(0x0015, Buffer.alloc(paddingPayloadLen));
    extensionsLen += padding.length;

    // SNI follows the leading GREASE; key_share follows the SCT extension.
    const KEY_SHARE_INSERT_AFTER = 11;
    const extensions = [
        STATIC_EXTENSIONS[0],
        sni,
        ...STATIC_EXTENSIONS.slice(1, KEY_SHARE_INSERT_AFTER + 1),
        keyShare,
        ...STATIC_EXTENSIONS.slice(KEY_SHARE_INSERT_AFTER + 1),
        padding,
    ];

    const hello = Buffer.concat([
        Buffer.from([0x16, 0x03, 0x01, 0x02, 0x00]),
        Buffer.from([0x01, 0x00, 0x01, 0xfc]),
        Buffer.from([0x03, 0x03]),
        Buffer.alloc(FAKE_TLS_HELLO_RANDOM_LEN),
        Buffer.from([sessionId.length]),
        sessionId,
        Buffer.from([
            (CIPHER_SUITES.length >> 8) & 0xff,
            CIPHER_SUITES.length & 0xff,
        ]),
        CIPHER_SUITES,
        Buffer.from([0x01, 0x00]),
        Buffer.from([(extensionsLen >> 8) & 0xff, extensionsLen & 0xff]),
        ...extensions,
    ]);

    if (hello.length !== FAKE_TLS_HELLO_SIZE) {
        throw new Error(
            `FakeTLS: ClientHello size mismatch — got ${hello.length}, expected ${FAKE_TLS_HELLO_SIZE}`
        );
    }
    return hello;
}

/**
 * Wraps a {@link PromisedNetSockets} in MTProto fake-TLS framing. On
 * {@link handshake}: sends a Chrome-like ClientHello with the random field
 * stamped to `HMAC-SHA256(secret, hello)` (last 4 bytes XOR'd with unix
 * time), then verifies the server's random equals
 * `HMAC-SHA256(secret, client_random || server_response_zeroed)`. Post-
 * handshake, all bytes ride inside TLS application_data records.
 *
 * Exposes only the subset of {@link PromisedNetSockets} consumed by
 * {@link MTProxyIO} and the {@link ObfuscatedConnection} base class so it
 * can be hot-swapped in place of the raw socket.
 *
 * @internal
 */
class FakeTlsSocket implements ByteStream {
    private readonly inner: PromisedNetSockets;
    private readonly secret: Buffer;
    private readonly domain: string;
    private clientRandom: Buffer = Buffer.alloc(0);
    private readBuf: Buffer = Buffer.alloc(0);

    constructor(inner: PromisedNetSockets, secret: Buffer, domain: string) {
        if (secret.length !== SECRET_LEN) {
            throw new Error(
                `FakeTLS: secret must be ${SECRET_LEN} bytes, got ${secret.length}`
            );
        }
        this.inner = inner;
        this.secret = secret;
        this.domain = domain;
    }

    async handshake(): Promise<void> {
        const hello = this.sendClientHello();
        this.inner.write(hello);
        await this.readAndVerifyServerHandshake();
    }

    write(data: Buffer): void {
        for (let off = 0; off < data.length; off += TLS_RECORD_MAX_PAYLOAD) {
            const chunkLen = Math.min(TLS_RECORD_MAX_PAYLOAD, data.length - off);
            const hdr = Buffer.alloc(TLS_RECORD_HEADER_LEN);
            TLS_APP_DATA_PREFIX.copy(hdr, 0);
            hdr.writeUInt16BE(chunkLen, 3);
            this.inner.write(
                Buffer.concat([hdr, data.subarray(off, off + chunkLen)])
            );
        }
    }

    async readExactly(n: number): Promise<Buffer> {
        while (this.readBuf.length < n) {
            const { type, payload } = await readTlsRecord(this.inner);
            if (type !== TLS_RECORD_APPLICATION_DATA) continue;
            this.readBuf = Buffer.concat([this.readBuf, payload]);
        }
        const out = Buffer.from(this.readBuf.subarray(0, n));
        this.readBuf = this.readBuf.subarray(n);
        return out;
    }

    async close(): Promise<void> {
        await this.inner.close();
    }

    private sendClientHello(): Buffer {
        const sessionId = generateRandomBytes(32);
        const hello = buildClientHello(this.domain, sessionId);

        const stamp = createHmac("sha256", this.secret).update(hello).digest();
        const now = Math.floor(Date.now() / 1000) >>> 0;
        const lastWord =
            (stamp.readUInt32BE(FAKE_TLS_RANDOM_TIMESTAMP_XOR_OFFSET) ^ now) >>>
            0;
        stamp.writeUInt32BE(lastWord, FAKE_TLS_RANDOM_TIMESTAMP_XOR_OFFSET);
        stamp.copy(hello, FAKE_TLS_HELLO_RANDOM_OFFSET);

        this.clientRandom = stamp;
        return hello;
    }

    // Expects the canonical 3-record server response. Anything else fails
    // loudly rather than silently corrupting the downstream MTProxy stream.
    private async readAndVerifyServerHandshake(): Promise<void> {
        const expectedTypes = [
            TLS_RECORD_HANDSHAKE,
            TLS_RECORD_CHANGE_CIPHER_SPEC,
            TLS_RECORD_APPLICATION_DATA,
        ];

        const chunks: Buffer[] = [];
        let serverRandomOffset = -1;
        let offset = 0;

        for (let i = 0; i < expectedTypes.length; i++) {
            const { type, payload } = await readTlsRecord(this.inner);
            if (type !== expectedTypes[i]) {
                throw new Error(
                    `FakeTLS: expected ${tlsRecordTypeName(expectedTypes[i])} at record ${i}, got ${tlsRecordTypeName(type)}`
                );
            }
            if (i === 0) {
                serverRandomOffset = offset + FAKE_TLS_HELLO_RANDOM_OFFSET;
            }
            const hdr = Buffer.alloc(TLS_RECORD_HEADER_LEN);
            hdr[0] = type;
            hdr[1] = 0x03;
            hdr[2] = 0x03;
            hdr.writeUInt16BE(payload.length, 3);
            chunks.push(hdr, payload);
            offset += TLS_RECORD_HEADER_LEN + payload.length;
        }

        const serverResp = Buffer.concat(chunks);
        const serverRandom = Buffer.from(
            serverResp.subarray(
                serverRandomOffset,
                serverRandomOffset + FAKE_TLS_HELLO_RANDOM_LEN
            )
        );
        serverResp.fill(
            0,
            serverRandomOffset,
            serverRandomOffset + FAKE_TLS_HELLO_RANDOM_LEN
        );

        const expected = createHmac("sha256", this.secret)
            .update(this.clientRandom)
            .update(serverResp)
            .digest();
        if (!expected.equals(serverRandom)) {
            throw new Error("FakeTLS: server HMAC verification failed");
        }
    }
}

/**
 * Connection that routes traffic through a Telegram MTProxy server. Connects
 * to the proxy address (not Telegram directly), performs the MTProxy
 * obfuscated handshake, and tunnels MTProto traffic through with AES-CTR
 * encryption. When the secret carries a fake-TLS prefix the underlying
 * socket is first wrapped in a {@link FakeTlsSocket}.
 *
 * Not intended to be used directly — use {@link ConnectionTCPMTProxyAbridged}
 * instead, or pass an {@link MTProxyType} config to `TelegramClientParams.proxy`
 * and the client will select the correct connection class automatically.
 */
export class TCPMTProxy extends ObfuscatedConnection {
    ObfuscatedIO = MTProxyIO;

    _secret: Buffer;
    _fakeTlsDomain?: string;

    constructor({
        dcId,
        loggers,
        proxy,
        socket,
    }: TCPMTProxyInterfaceParams) {
        super({
            ip: proxy.ip,
            port: proxy.port,
            dcId,
            loggers,
            socket,
            proxy,
        });

        if (!("MTProxy" in proxy)) {
            throw new Error("This connection only supports MTProxies");
        }
        const parsed = parseProxySecret(proxy.secret);
        this._secret = parsed.key;
        this._fakeTlsDomain = parsed.fakeTlsDomain;
    }

    async _initConn(): Promise<void> {
        if (this._fakeTlsDomain) {
            const tls = new FakeTlsSocket(
                this.socket,
                this._secret,
                this._fakeTlsDomain
            );
            await tls.handshake();
            this.socket = tls as unknown as PromisedNetSockets;
        }
        await super._initConn();
    }
}

/**
 * MTProxy connection using the Abridged packet codec — automatically selected
 * when `proxy.MTProxy` is `true`.
 */
export class ConnectionTCPMTProxyAbridged extends TCPMTProxy {
    PacketCodecClass = AbridgedPacketCodec;
}
