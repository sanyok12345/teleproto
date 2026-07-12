import * as net from "node:net";
import { SocksClient } from "socks";

import {
    ProxyInterface,
    SocksProxyType,
} from "../network/connection/TCPMTProxy";

const closeError = new Error("NetSocket was closed");

/**
 * Promise-based TCP socket wrapper used as the network transport layer.
 *
 * When a {@link SocksProxyType} proxy is provided, connections are tunneled
 * through the SOCKS proxy via the `socks` package. MTProxy connections are
 * handled at a higher level by {@link TCPMTProxy} and do not affect this class.
 */
export class PromisedNetSockets {
    private client?: net.Socket;
    private closed: boolean;
    private chunks: Buffer[];
    private headOffset: number;
    private available: number;
    private canRead?: Promise<boolean>;
    private resolveRead: ((value?: any) => void) | undefined;
    private proxy?: SocksProxyType;

    constructor(proxy?: ProxyInterface) {
        this.client = undefined;
        this.closed = true;
        this.chunks = [];
        this.headOffset = 0;
        this.available = 0;
        if (proxy) {
            // we only want to use this when it's not an MTProto proxy.
            if (!("MTProxy" in proxy)) {
                if (!proxy.ip || !proxy.port || !proxy.socksType) {
                    throw new Error(
                        `Invalid sockets params: ip=${proxy.ip}, port=${proxy.port}, socksType=${proxy.socksType}`
                    );
                }
                this.proxy = proxy;
            }
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

    /**
     * Creates a new connection
     * @param port
     * @param ip
     * @returns {Promise<void>}
     */
    async connect(port: number, ip: string) {
        this.chunks = [];
        this.headOffset = 0;
        this.available = 0;
        let connected = false;
        if (this.proxy) {
            const info = await SocksClient.createConnection({
                proxy: {
                    host: this.proxy.ip,
                    port: this.proxy.port,
                    type: this.proxy.socksType,
                    userId: this.proxy.username,
                    password: this.proxy.password,
                },

                command: "connect",
                timeout: (this.proxy.timeout || 5) * 1000,
                destination: {
                    host: ip,
                    port: port,
                },
            });
            this.client = info.socket;
            connected = true;
        } else {
            this.client = new net.Socket();
        }

        this.canRead = new Promise((resolve) => {
            this.resolveRead = resolve;
        });
        this.closed = false;
        return new Promise((resolve, reject) => {
            if (this.client) {
                const tune = (socket: net.Socket) => {
                    socket.setNoDelay(true);
                    socket.setKeepAlive(true, 30_000);
                };
                if (connected) {
                    tune(this.client);
                    this.receive();
                    resolve(this);
                } else {
                    this.client.connect(port, ip, () => {
                        tune(this.client!);
                        this.receive();
                        resolve(this);
                    });
                }
                this.client.on("error", reject);
                this.client.on("close", () => {
                    if (this.client && this.client.destroyed) {
                        if (this.resolveRead) {
                            this.resolveRead(false);
                        }
                        this.closed = true;
                    }
                });
            }
        });
    }

    write(data: Buffer) {
        if (this.closed) {
            throw closeError;
        }
        if (this.client) {
            this.client.write(data);
        }
    }

    async close() {
        const socket = this.client;
        this.closed = true;
        if (!socket) return;

        const closed = new Promise<void>((resolve) => {
            if (socket.destroyed) resolve();
            else socket.once("close", () => resolve());
        });
        socket.destroy();
        socket.unref();
        await closed;
    }

    async receive() {
        if (this.client) {
            this.client.on("data", (chunk: Buffer) => {
                this.chunks.push(chunk);
                this.available += chunk.length;
                if (this.resolveRead) {
                    this.resolveRead(true);
                }
            });
        }
    }
    toString() {
        return "PromisedNetSocket";
    }
}
