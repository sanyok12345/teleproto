import type { ProxyInterface } from "../../client/TelegramBaseClient";
import type { PacketReader } from "../../network/transport/socket/types";
import { Buffer } from "../../platform";

export type { PacketReader };

/** @deprecated Implement a {@link Transport} instead. */
export interface SocketInterface extends PacketReader {
    connect(port: number, ip: string, testServers?: boolean): Promise<unknown>;
    readAll(): Promise<Buffer>;
    write(data: Buffer): void;
    close(): Promise<void>;
    lastDataAt?: number;
}

/** @deprecated Implement a {@link Transport} instead. */
export interface SocketFactory {
    new (proxy?: ProxyInterface, keepAliveInterval?: number): SocketInterface;
    readonly isWebSocket?: boolean;
}
