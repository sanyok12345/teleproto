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

export interface SocketFactory {
    new (keepAliveInterval?: number): SocketInterface;
}
