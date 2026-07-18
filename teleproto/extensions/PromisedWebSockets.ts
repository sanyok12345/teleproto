import type { ProxyInterface } from "../network/connection/TCPMTProxy";

const closeError = new Error("WebSocket was closed");

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

export class PromisedWebSockets {
    static readonly isWebSocket = true;
    static webSocketImpl?: WebSocketCtor;

    private client?: WebSocketLike;
    private closed: boolean;
    private chunks: Buffer[];
    private headOffset: number;
    private available: number;
    private canRead?: Promise<boolean>;
    private resolveRead: ((value?: any) => void) | undefined;

    constructor(proxy?: ProxyInterface, _keepAliveInterval?: number) {
        this.client = undefined;
        this.closed = true;
        this.chunks = [];
        this.headOffset = 0;
        this.available = 0;
        if (proxy && !("MTProxy" in proxy)) {
            throw new Error(
                "Socks proxies are not supported over the WebSocket transport"
            );
        }
    }

    async readExactly(number: number) {
        const parts: Buffer[] = [];
        let need = number;
        while (need > 0) {
            const part = await this.read(need);
            parts.push(part);
            need -= part.length;
        }
        return parts.length === 1 ? parts[0] : Buffer.concat(parts);
    }

    async read(number: number) {
        if (this.closed) {
            throw closeError;
        }
        await this.canRead;
        if (this.closed) {
            throw closeError;
        }
        const toReturn = this._consume(Math.min(number, this.available));
        if (this.available === 0) {
            this.canRead = new Promise((resolve) => {
                this.resolveRead = resolve;
            });
        }

        return toReturn;
    }

    async readAll() {
        if (this.closed || !(await this.canRead)) {
            throw closeError;
        }
        const toReturn = this._consume(this.available);
        this.canRead = new Promise((resolve) => {
            this.resolveRead = resolve;
        });
        return toReturn;
    }

    private _consume(n: number): Buffer {
        if (n <= 0) {
            return Buffer.alloc(0);
        }
        const head = this.chunks[0];
        if (head && head.length - this.headOffset >= n) {
            const out = head.subarray(this.headOffset, this.headOffset + n);
            this.headOffset += n;
            this.available -= n;
            if (this.headOffset === head.length) {
                this.chunks.shift();
                this.headOffset = 0;
            }
            return out;
        }
        const out = Buffer.alloc(n);
        let written = 0;
        while (written < n) {
            const chunk = this.chunks[0]!;
            const take = Math.min(
                chunk.length - this.headOffset,
                n - written
            );
            chunk.copy(
                out,
                written,
                this.headOffset,
                this.headOffset + take
            );
            written += take;
            this.headOffset += take;
            if (this.headOffset === chunk.length) {
                this.chunks.shift();
                this.headOffset = 0;
            }
        }
        this.available -= n;
        return out;
    }

    async connect(port: number, ip: string, testServers = false) {
        const impl =
            PromisedWebSockets.webSocketImpl ??
            (globalThis as { WebSocket?: WebSocketCtor }).WebSocket;
        if (!impl) {
            throw new Error(
                "No WebSocket implementation found: run on Node.js 22+ or a browser, " +
                    'or set PromisedWebSockets.webSocketImpl (e.g. require("ws").WebSocket)'
            );
        }
        this.chunks = [];
        this.headOffset = 0;
        this.available = 0;
        const scheme = port === 443 ? "wss" : "ws";
        const url = `${scheme}://${ip}:${port}/apiws${
            testServers ? "_test" : ""
        }`;
        const socket = new impl(url, "binary");
        socket.binaryType = "arraybuffer";
        this.client = socket;
        this.canRead = new Promise((resolve) => {
            this.resolveRead = resolve;
        });
        this.closed = false;
        socket.onmessage = (ev) => {
            const chunk =
                typeof ev.data === "string"
                    ? Buffer.from(ev.data)
                    : Buffer.from(new Uint8Array(ev.data));
            this.chunks.push(chunk);
            this.available += chunk.length;
            if (this.resolveRead) {
                this.resolveRead(true);
            }
        };
        await new Promise<void>((resolve, reject) => {
            socket.onopen = () => resolve();
            socket.onerror = () => {
                this.closed = true;
                if (this.resolveRead) {
                    this.resolveRead(false);
                }
                reject(new Error(`WebSocket connection to ${url} failed`));
            };
            socket.onclose = () => {
                this.closed = true;
                if (this.resolveRead) {
                    this.resolveRead(false);
                }
                reject(closeError);
            };
        });
        return this;
    }

    write(data: Buffer) {
        if (this.closed) {
            throw closeError;
        }
        if (this.client) {
            this.client.send(data);
        }
    }

    async close() {
        const socket = this.client;
        this.closed = true;
        this.client = undefined;
        if (socket) {
            socket.close();
        }
    }

    toString() {
        return "PromisedWebSockets";
    }
}
