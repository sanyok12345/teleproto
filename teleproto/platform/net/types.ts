import { Buffer } from "../buffer";

export interface TcpSocket {
    readonly destroyed: boolean;
    connect(port: number, host: string, listener: () => void): unknown;
    write(data: Uint8Array): unknown;
    setNoDelay(noDelay: boolean): unknown;
    setKeepAlive(enable: boolean, initialDelay: number): unknown;
    destroy(): unknown;
    unref(): unknown;
    on(event: "data", listener: (chunk: Buffer) => void): unknown;
    on(event: "close", listener: () => void): unknown;
    on(event: "error", listener: (error: Error) => void): unknown;
    once(event: "close", listener: () => void): unknown;
    once(event: "error", listener: (error: Error) => void): unknown;
    off(event: "error", listener: (error: Error) => void): unknown;
}

export interface HttpConnectOptions {
    host: string;
    port: number;
    tls: boolean;
    target: string;
    headers: Record<string, string>;
    timeoutMs: number;
    timeoutError: () => Error;
}

export interface HttpConnectResponse<Socket extends TcpSocket> {
    statusCode?: number;
    statusMessage?: string;
    socket: Socket;
    head: Buffer;
}

export interface SocksConnectOptions {
    host: string;
    port: number;
    version: 4 | 5;
    username?: string;
    password?: string;
    timeoutMs: number;
    destination: { host: string; port: number };
}

export interface Network<Socket extends TcpSocket> {
    readonly tcp: boolean;
    createSocket(): Socket;
    isIP(host: string): number;
    httpConnect(options: HttpConnectOptions): Promise<HttpConnectResponse<Socket>>;
    socksConnect(options: SocksConnectOptions): Promise<Socket>;
}
