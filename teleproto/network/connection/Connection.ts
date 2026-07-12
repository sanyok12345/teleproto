import {
    Logger,
    PromisedNetSockets,
} from "../../extensions";
import { AbridgedPacketCodec } from "./TCPAbridged";
import { FullPacketCodec } from "./TCPFull";
import { ProxyInterface } from "./TCPMTProxy";

interface ConnectionInterfaceParams {
    ip: string;
    port: number;
    dcId: number;
    loggers: Logger;
    proxy?: ProxyInterface;
    socket: typeof PromisedNetSockets;
}

/**
 * Thin transport pipe: codec framing over one socket.
 *
 * There are deliberately no internal loops, queues or buffers here the
 * sender owns exactly one reader and one writer, so `send()` and `recv()`
 * talk to the codec and socket directly. Transport-level failures (including
 * MTProto transport errors such as -404) propagate to the caller as thrown
 * errors from these two methods.
 */
class Connection {
    PacketCodecClass?: typeof AbridgedPacketCodec | typeof FullPacketCodec;
    readonly _ip: string;
    readonly _port: number;
    _dcId: number;
    _log: Logger;
    _proxy?: ProxyInterface;
    _connected: boolean;
    protected _codec: any;
    protected _obfuscation: any;
    socket: PromisedNetSockets;

    constructor({
        ip,
        port,
        dcId,
        loggers,
        proxy,
        socket,
    }: ConnectionInterfaceParams) {
        this._ip = ip;
        this._port = port;
        this._dcId = dcId;
        this._log = loggers;
        this._proxy = proxy;
        this._connected = false;
        this._codec = undefined;
        this._obfuscation = undefined; // TcpObfuscated and MTProxy
        this.socket = new socket(proxy);
    }

    async connect() {
        this._log.debug("Connecting");
        this._codec = new this.PacketCodecClass!(this);
        await this.socket.connect(this._port, this._ip);
        this._log.debug("Finished connecting");
        await this._initConn();
        this._connected = true;
    }

    async disconnect() {
        if (!this._connected) {
            return;
        }
        this._connected = false;
        await this.socket.close();
    }

    async send(data: Buffer) {
        if (!this._connected) {
            throw new Error("Not connected");
        }
        await this._send(data);
    }

    async recv() {
        if (!this._connected) {
            throw new Error("Not connected");
        }
        const data = await this._recv();
        if (!data || !data.length) {
            throw new Error("No data received");
        }
        return data;
    }

    isConnected() {
        return this._connected;
    }

    async _initConn() {
        if (this._codec.tag) {
            await this.socket.write(this._codec.tag);
        }
    }

    async _send(data: Buffer) {
        const encodedPacket = this._codec.encodePacket(data);
        this.socket.write(encodedPacket);
    }

    async _recv() {
        return await this._codec.readPacket(this.socket);
    }

    toString() {
        return `${this._ip}:${this._port}/${this.constructor.name.replace(
            "Connection",
            ""
        )}`;
    }
}

class ObfuscatedConnection extends Connection {
    ObfuscatedIO: any = undefined;

    async _initConn() {
        this._obfuscation = new this.ObfuscatedIO(this);
        await this._obfuscation.initHeader();
        this.socket.write(this._obfuscation.header);
    }

    async _send(data: Buffer) {
        this._obfuscation.write(this._codec.encodePacket(data));
    }

    async _recv() {
        return await this._codec.readPacket(this._obfuscation);
    }
}

class PacketCodec {
    private _conn: Connection;

    constructor(connection: Connection) {
        this._conn = connection;
    }

    encodePacket(data: Buffer) {
        throw new Error("Not Implemented");

        // Override
    }

    async readPacket(
        reader: PromisedNetSockets
    ): Promise<Buffer> {
        // override
        throw new Error("Not Implemented");
    }
}

export { Connection, PacketCodec, ObfuscatedConnection };
