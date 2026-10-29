import type { Connection, ConnectionInterfaceParams } from "../connection/Connection";
import { ConnectionTCPObfuscated, ObfuscatedIO } from "../connection/Obfuscation";
import { IntermediatePacketCodec, PaddedIntermediatePacketCodec } from "../connection/IntermediateCodec";
import { NetSocket } from "./socket/NetSocket";
import type { SocketInterface } from "./socket/types";
import { ByteQueue } from "./socket/ByteStream";
import { generateRandomBytes } from "../../Helpers";
import { Buffer, crypto } from "../../platform";
import { Transport, ownFraming, type ResolvedTransport } from "./Transport";

export interface MTProxyTransportOptions {
    host: string;
    port: number;
    /** Hex, base64 or base64url: 16 bytes, `dd` + 16 bytes, or `ee` + 16 bytes + domain. */
    secret: string;
}

export interface ProxySecret {
    key: Buffer;
    padded: boolean;
    fakeTlsDomain?: Buffer;
}

export function parseProxySecret(input: string): ProxySecret {
    let raw: Buffer;
    if (/^(?:[0-9a-f]{2})+$/i.test(input)) raw = Buffer.from(input, "hex");
    else if (/^[A-Za-z0-9+/_-]+={0,2}$/.test(input)) raw = Buffer.from(input, "base64");
    else throw new Error("MTProxy: wrong proxy secret");
    if (raw.length > 17 + MAX_DOMAIN_LENGTH) throw new Error("MTProxy: too long secret");
    if (raw.length === 16) return { key: raw, padded: false };
    if (raw.length === 17 && raw[0] === 0xdd) return { key: raw.subarray(1), padded: true };
    if (raw.length > 17 && raw[0] === 0xee) {
        return { key: raw.subarray(1, 17), padded: true, fakeTlsDomain: raw.subarray(17) };
    }
    throw new Error(raw.length < 16 ? "MTProxy: wrong proxy secret" : "MTProxy: unsupported proxy secret");
}

const MAX_DOMAIN_LENGTH = 182;

const RECORD_HEADER_LEN = 5;
const MAX_RECORD_PAYLOAD = 2878;
const RANDOM_OFFSET = 11;
const RANDOM_LEN = 32;

const APPLICATION_DATA = Buffer.from([0x17, 0x03, 0x03]);
const CHANGE_CIPHER_SPEC = Buffer.from([0x14, 0x03, 0x03, 0x00, 0x01, 0x01]);
const SERVER_HELLO_PREFIX = Buffer.from([0x16, 0x03, 0x03]);
const SERVER_CCS_AND_DATA_PREFIX = Buffer.concat([CHANGE_CIPHER_SPEC, APPLICATION_DATA]);

function u16(value: number): Buffer {
    const out = Buffer.alloc(2);
    out.writeUInt16BE(value, 0);
    return out;
}

function scope(...parts: Buffer[]): Buffer {
    const body = Buffer.concat(parts);
    return Buffer.concat([u16(body.length), body]);
}

function hex(value: string): Buffer {
    return Buffer.from(value.replace(/\s+/g, ""), "hex");
}

function shuffle<T>(items: T[]): T[] {
    for (let i = items.length - 1; i > 0; i--) {
        const j = crypto.randomInt(i + 1);
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
}

function greaseValues(): Buffer {
    const grease = generateRandomBytes(7);
    for (let i = 0; i < grease.length; i++) grease[i] = (grease[i] & 0xf0) + 0x0a;
    for (let i = 1; i < grease.length; i += 2) {
        if (grease[i] === grease[i - 1]) grease[i] ^= 0x10;
    }
    return grease;
}

function mlKem768Key(): Buffer {
    const key = Buffer.alloc(384 * 3 + 32);
    for (let i = 0; i < 384; i++) {
        const a = crypto.randomInt(3329);
        const b = crypto.randomInt(3329);
        key[i * 3] = a & 0xff;
        key[i * 3 + 1] = (a >> 8) + ((b & 0x0f) << 4);
        key[i * 3 + 2] = b >> 4;
    }
    generateRandomBytes(32).copy(key, 384 * 3);
    return key;
}

function buildClientHello(domain: Buffer): Buffer {
    const grease = greaseValues();
    const g = (seed: number) => Buffer.from([grease[seed], grease[seed]]);

    const extensions = shuffle([
        Buffer.concat([hex("0000"), scope(scope(hex("00"), scope(domain)))]),
        hex("000500050100000000"),
        Buffer.concat([hex("000a000c000a"), g(4), hex("11ec001d00170018")]),
        hex("000b00020100"),
        hex("000d0018001609040905090604030804040105030805050108060601"),
        hex("0010000e000c02683208687474702f312e31"),
        hex("00120000"),
        hex("00170000"),
        hex("001b0003020002"),
        hex("00230000"),
        Buffer.concat([hex("002b000706"), g(6), hex("03040303")]),
        hex("002d00020101"),
        Buffer.concat([
            hex("003304ef04ed"),
            g(4),
            hex("00010011ec04c0"),
            mlKem768Key(),
            crypto.x25519PublicKey(),
            hex("001d0020"),
            crypto.x25519PublicKey(),
        ]),
        hex("44cd00050003026832"),
        Buffer.concat([
            hex("fe0d"),
            scope(
                hex("0000010001"),
                generateRandomBytes(1),
                hex("0020"),
                crypto.x25519PublicKey(),
                scope(generateRandomBytes(crypto.randomInt(4) * 32 + 144))
            ),
        ]),
        hex("ff01000100"),
    ]);

    const body = (padding?: Buffer) =>
        scope(
            hex("0303"),
            Buffer.alloc(RANDOM_LEN),
            hex("20"),
            generateRandomBytes(32),
            hex("0020"),
            g(0),
            hex("130113021303c02bc02fc02cc030cca9cca8c013c014009c009d002f0035"),
            hex("0100"),
            scope(g(2), hex("0000"), ...extensions, g(3), hex("000100"), ...(padding ? [padding] : []))
        );

    let hello = Buffer.concat([hex("160301"), scope(hex("0100"), body())]);
    if (hello.length < 513) {
        const padding = Buffer.concat([hex("0015"), scope(Buffer.alloc(513 - hello.length))]);
        hello = Buffer.concat([hex("160301"), scope(hex("0100"), body(padding))]);
    }
    return hello;
}

class FakeTlsSocket implements SocketInterface {
    private readonly inner: SocketInterface;
    private readonly secret: Buffer;
    private readonly domain: Buffer;
    private readonly incoming = new ByteQueue();
    private firstRecord = true;
    private prefix?: Buffer;

    constructor(inner: SocketInterface, secret: Buffer, domain: Buffer) {
        this.inner = inner;
        this.secret = secret;
        this.domain = domain.subarray(0, MAX_DOMAIN_LENGTH);
    }

    get lastDataAt(): number | undefined {
        return this.inner.lastDataAt;
    }

    async handshake(): Promise<void> {
        const hello = buildClientHello(this.domain);
        const random = crypto.hmac("sha256", this.secret, hello);
        const now = Math.floor(Date.now() / 1000);
        random.writeInt32LE(random.readInt32LE(28) ^ now, 28);
        random.copy(hello, RANDOM_OFFSET);
        this.inner.write(hello);

        const response: Buffer[] = [];
        for (const prefix of [SERVER_HELLO_PREFIX, SERVER_CCS_AND_DATA_PREFIX]) {
            const head = await this.inner.readExactly(prefix.length + 2);
            if (!head.subarray(0, prefix.length).equals(prefix)) {
                throw new Error("FakeTLS: first part of response to hello is invalid");
            }
            const body = await this.inner.readExactly(head.readUInt16BE(prefix.length));
            response.push(head, body);
        }
        const serverResponse = Buffer.concat(response);
        const serverRandom = Buffer.from(
            serverResponse.subarray(RANDOM_OFFSET, RANDOM_OFFSET + RANDOM_LEN)
        );
        serverResponse.fill(0, RANDOM_OFFSET, RANDOM_OFFSET + RANDOM_LEN);
        const expected = crypto.createHmac("sha256", this.secret).update(random).update(serverResponse).digest();
        if (!expected.equals(serverRandom)) {
            throw new Error("FakeTLS: response hash mismatch");
        }
    }

    setPrefix(data: Buffer): void {
        this.prefix = data;
    }

    write(data: Buffer): void {
        if (this.prefix) {
            data = Buffer.concat([this.prefix, data]);
            this.prefix = undefined;
        }
        const records: Buffer[] = [];
        if (this.firstRecord) {
            this.firstRecord = false;
            records.push(CHANGE_CIPHER_SPEC);
        }
        for (let off = 0; off < data.length; off += MAX_RECORD_PAYLOAD) {
            const chunk = data.subarray(off, off + MAX_RECORD_PAYLOAD);
            records.push(APPLICATION_DATA, u16(chunk.length), chunk);
        }
        this.inner.write(Buffer.concat(records));
    }

    async readExactly(n: number): Promise<Buffer> {
        while (this.incoming.bytes < n) {
            const head = await this.inner.readExactly(RECORD_HEADER_LEN);
            if (!head.subarray(0, 3).equals(APPLICATION_DATA)) {
                throw new Error("FakeTLS: invalid bytes at the beginning of a packet");
            }
            this.incoming.push(await this.inner.readExactly(head.readUInt16BE(3)));
        }
        return this.incoming.take(n);
    }

    read(n: number): Promise<Buffer> {
        return this.readExactly(n);
    }

    async connect(): Promise<unknown> {
        throw new Error("FakeTLS: wraps an already connected socket");
    }

    close(): Promise<void> {
        return this.inner.close();
    }
}

export function mtproxyConnection(host: string, port: number, secret: ProxySecret): typeof Connection {
    return class MTProxyConnection extends ConnectionTCPObfuscated {
        PacketCodecClass = secret.padded ? PaddedIntermediatePacketCodec : IntermediatePacketCodec;

        constructor(params: ConnectionInterfaceParams) {
            super({ ...params, ip: host, port });
            this.secret = secret.key;
            this.fakeTls = !!secret.fakeTlsDomain;
        }

        get usesRandomPadding(): boolean {
            return secret.padded;
        }

        protected async handshake(): Promise<void> {
            if (!secret.fakeTlsDomain) return super.handshake();
            const tls = new FakeTlsSocket(this.socket, secret.key, secret.fakeTlsDomain);
            await tls.handshake();
            this.socket = tls;
            this.obfuscation = await ObfuscatedIO.create(tls, this.obfuscationParams());
            tls.setPrefix(this.obfuscation.header);
        }
    };
}

export class MTProxyTransport extends Transport {
    constructor(readonly options: MTProxyTransportOptions) {
        super();
    }

    resolve(connection?: typeof Connection): ResolvedTransport {
        const { host, port, secret } = this.options;
        const framing = mtproxyConnection(host, port, parseProxySecret(secret));
        return {
            connection: ownFraming("MTProxyTransport", framing, connection),
            socket: NetSocket,
            clientProxy: { address: host, port },
            proxied: true,
        };
    }
}
