import { Buffer } from "../../../platform";

export interface PacketReader {
    read(n: number): Promise<Buffer>;
    readExactly(n: number): Promise<Buffer>;
}

export interface SocketInterface extends PacketReader {
    connect(port: number, ip: string, testServers?: boolean): Promise<unknown>;
    write(data: Buffer): void;
    close(): Promise<void>;
    lastDataAt?: number;
}

/** A connected duplex byte stream, such as a `net.Socket`. */
export interface TransportStream {
    readonly destroyed: boolean;
    write(data: Uint8Array): unknown;
    destroy(): unknown;
    on(event: "data", listener: (chunk: Buffer) => void): unknown;
    on(event: "close", listener: () => void): unknown;
    on(event: "error", listener: (error: Error) => void): unknown;
    once(event: "close", listener: () => void): unknown;
    once(event: "error", listener: (error: Error) => void): unknown;
    off(event: "error", listener: (error: Error) => void): unknown;
    setNoDelay?(noDelay: boolean): unknown;
    setKeepAlive?(enable: boolean, initialDelay: number): unknown;
    unref?(): unknown;
}

export interface SocketFactory {
    new (keepAliveInterval?: number): SocketInterface;
}
