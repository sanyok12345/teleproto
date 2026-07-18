import type { ProxyInterface } from "../network/connection/TCPMTProxy";

export interface PacketReader {
    read(n: number): Promise<Buffer>;
    readExactly(n: number): Promise<Buffer>;
}

export interface SocketInterface extends PacketReader {
    connect(port: number, ip: string, testServers?: boolean): Promise<unknown>;
    readAll(): Promise<Buffer>;
    write(data: Buffer): void;
    close(): Promise<void>;
}

export interface SocketFactory {
    new (
        proxy?: ProxyInterface,
        keepAliveInterval?: number
    ): SocketInterface;
    readonly isWebSocket?: boolean;
}
