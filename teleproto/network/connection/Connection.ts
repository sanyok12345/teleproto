import type { Logger } from "../../extensions/Logger";
import type { PacketReader, SocketFactory, SocketInterface } from "../transport/socket/types";

export interface ConnectionInterfaceParams {
    ip: string;
    port: number;
    dcId: number;
    loggers: Logger;
    socket: SocketFactory;
    testServers?: boolean;
    keepAliveInterval?: number;
}

export abstract class PacketCodec {
    static readonly tag?: Buffer;
    static readonly obfuscateTag?: Buffer;
    abstract encodePacket(data: Buffer): Buffer;
    abstract readPacket(reader: PacketReader): Promise<Buffer>;
}

export type PacketCodecClass = (new () => PacketCodec) & {
    readonly tag?: Buffer;
    readonly obfuscateTag?: Buffer;
};

export class Connection {
    PacketCodecClass?: PacketCodecClass;
    readonly ip: string;
    readonly port: number;
    readonly dcId: number;
    readonly testServers: boolean;
    readonly log: Logger;
    socket: SocketInterface;
    protected codec?: PacketCodec;
    private connected = false;
    private readonly rawSocket: SocketInterface;

    constructor(private readonly params: ConnectionInterfaceParams) {
        this.ip = params.ip;
        this.port = params.port;
        this.dcId = params.dcId;
        this.testServers = !!params.testServers;
        this.log = params.loggers;
        this.socket = this.rawSocket = new params.socket(params.keepAliveInterval);
    }

    get usesRandomPadding(): boolean {
        return false;
    }

    protected get codecClass(): PacketCodecClass {
        if (!this.PacketCodecClass) throw new Error(`${this.constructor.name} has no packet codec`);
        return this.PacketCodecClass;
    }

    async connect() {
        this.codec = new this.codecClass();
        this.socket = this.rawSocket;
        try {
            await this.socket.connect(this.port, this.ip, this.testServers);
            await this.handshake();
        } catch (error) {
            await this.socket.close().catch(() => { });
            throw error;
        }
        this.connected = true;
    }

    async disconnect() {
        this.connected = false;
        await this.socket.close();
    }

    isConnected() {
        return this.connected;
    }

    async send(data: Buffer) {
        if (!this.connected || !this.codec) throw new Error("Not connected");
        this.write(this.codec.encodePacket(data));
    }

    async recv(): Promise<Buffer> {
        if (!this.connected || !this.codec) throw new Error("Not connected");
        const data = await this.codec.readPacket(this.reader);
        if (!data.length) throw new Error("No data received");
        return data;
    }

    clone(): Connection {
        return new (this.constructor as new (params: ConnectionInterfaceParams) => Connection)(this.params);
    }

    protected async handshake() {
        const tag = this.codecClass.tag;
        if (tag) this.socket.write(tag);
    }

    protected write(packet: Buffer) {
        this.socket.write(packet);
    }

    protected get reader(): PacketReader {
        return this.socket;
    }

    toString() {
        return `${this.ip}:${this.port}/${this.constructor.name.replace("Connection", "")}`;
    }
}
