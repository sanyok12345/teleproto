import { generateRandomBytes, sha256 } from "../../Helpers";
import { Connection } from "./Connection";
import { IntermediatePacketCodec } from "./IntermediateCodec";
import { CTR } from "../../crypto/CTR";
import type { PacketReader, SocketInterface } from "../transport/socket/types";

const FORBIDDEN_FIRST_INTS = new Set([
    0x44414548,
    0x54534f50,
    0x20544547,
    0x4954504f,
    0x02010316,
    0xdddddddd,
    0xeeeeeeee,
]);

export interface ObfuscationParams {
    protocolTag: Buffer;
    dcId: number;
    testServers: boolean;
    secret?: Buffer;
    fakeTls?: boolean;
}

function pickHeader(fakeTls: boolean): Buffer {
    while (true) {
        const header = generateRandomBytes(64);
        if (fakeTls) return header;
        if (header[0] === 0xef) continue;
        if (FORBIDDEN_FIRST_INTS.has(header.readUInt32LE(0))) continue;
        if (header.readUInt32LE(4) === 0) continue;
        return header;
    }
}

export class ObfuscatedIO implements PacketReader {
    private constructor(
        private readonly socket: SocketInterface,
        readonly header: Buffer,
        private readonly encryptor: CTR,
        private readonly decryptor: CTR
    ) { }

    static async create(socket: SocketInterface, params: ObfuscationParams): Promise<ObfuscatedIO> {
        const header = pickHeader(!!params.fakeTls);
        params.protocolTag.copy(header, 56);
        const dcId = params.testServers ? Math.sign(params.dcId) * (Math.abs(params.dcId) + 10000) : params.dcId;
        if (dcId !== 0) header.writeInt16LE(dcId, 60);
        const reversed = Buffer.from(header).reverse();
        const key = async (source: Buffer) =>
            params.secret ? sha256(Buffer.concat([source, params.secret])) : Buffer.from(source);
        const encryptor = new CTR(await key(header.subarray(8, 40)), Buffer.from(header.subarray(40, 56)));
        const decryptor = new CTR(await key(reversed.subarray(8, 40)), Buffer.from(reversed.subarray(40, 56)));
        encryptor.encrypt(header).subarray(56).copy(header, 56);
        return new ObfuscatedIO(socket, header, encryptor, decryptor);
    }

    async read(n: number): Promise<Buffer> {
        return this.decryptor.encryptInPlace(await this.socket.read(n));
    }

    async readExactly(n: number): Promise<Buffer> {
        return this.decryptor.encryptInPlace(await this.socket.readExactly(n));
    }

    write(data: Buffer) {
        this.socket.write(this.encryptor.encryptInPlace(data));
    }

    dispose() {
        this.encryptor.dispose();
        this.decryptor.dispose();
    }
}

export class ObfuscatedConnection extends Connection {
    secret?: Buffer;
    fakeTls = false;
    protected obfuscation?: ObfuscatedIO;

    protected obfuscationParams(): ObfuscationParams {
        const protocolTag = this.codecClass.obfuscateTag;
        if (!protocolTag) throw new Error(`${this.codecClass.name} cannot be obfuscated`);
        return { protocolTag, dcId: this.dcId, testServers: this.testServers, secret: this.secret, fakeTls: this.fakeTls };
    }

    protected async handshake() {
        this.obfuscation = await ObfuscatedIO.create(this.socket, this.obfuscationParams());
        this.socket.write(this.obfuscation.header);
    }

    protected write(packet: Buffer) {
        this.obfuscation!.write(packet);
    }

    protected get reader(): PacketReader {
        return this.obfuscation!;
    }

    async disconnect() {
        await super.disconnect();
        this.obfuscation?.dispose();
        this.obfuscation = undefined;
    }
}

export class ConnectionTCPObfuscated extends ObfuscatedConnection {
    PacketCodecClass = IntermediatePacketCodec;
}
