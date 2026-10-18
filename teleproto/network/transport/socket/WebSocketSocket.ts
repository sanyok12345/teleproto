import { ByteStream, SocketClosedError } from "./ByteStream";
import type { SocketInterface } from "./types";

interface WebSocketLike {
    binaryType: string;
    send(data: Uint8Array): void;
    close(code?: number): void;
    onopen: ((ev?: unknown) => void) | null;
    onmessage: ((ev: { data: ArrayBuffer | string }) => void) | null;
    onclose: ((ev?: unknown) => void) | null;
    onerror: ((ev?: unknown) => void) | null;
}

type WebSocketCtor = new (url: string, protocols?: string | string[]) => WebSocketLike;

export class WebSocketSocket implements SocketInterface {
    static webSocketImpl?: WebSocketCtor;

    private socket?: WebSocketLike;
    private stream = new ByteStream();

    constructor() {
        this.stream.end();
    }

    get lastDataAt() {
        return this.stream.lastDataAt;
    }

    async connect(port: number, ip: string, testServers = false) {
        const impl = (this.constructor as typeof WebSocketSocket).webSocketImpl ?? WebSocketSocket.webSocketImpl ?? (globalThis as { WebSocket?: WebSocketCtor }).WebSocket;
        if (!impl) {
            throw new Error(
                "No WebSocket implementation found: run on Node.js 22+ or a browser, " +
                    'or set WebSocketSocket.webSocketImpl (e.g. require("ws").WebSocket)'
            );
        }
        const stream = (this.stream = new ByteStream());
        const url = `${port === 443 ? "wss" : "ws"}://${ip}:${port}/apiws${testServers ? "_test" : ""}`;
        const socket = new impl(url, "binary");
        socket.binaryType = "arraybuffer";
        this.socket = socket;
        socket.onmessage = (ev) =>
            stream.push(typeof ev.data === "string" ? Buffer.from(ev.data) : Buffer.from(new Uint8Array(ev.data)));
        await new Promise<void>((resolve, reject) => {
            socket.onopen = () => resolve();
            socket.onerror = () => {
                const error = new Error(`WebSocket connection to ${url} failed`);
                stream.end(error);
                reject(error);
            };
            socket.onclose = () => {
                const error = new SocketClosedError("WebSocket was closed");
                stream.end(error);
                reject(error);
            };
        });
    }

    read(n: number) {
        return this.stream.read(n);
    }

    readExactly(n: number) {
        return this.stream.readExactly(n);
    }

    write(data: Buffer) {
        if (this.stream.closed || !this.socket) throw new SocketClosedError("WebSocket was closed");
        this.socket.send(data);
    }

    async close() {
        const socket = this.socket;
        this.socket = undefined;
        this.stream.end();
        socket?.close();
    }

    toString() {
        return "WebSocketSocket";
    }
}
