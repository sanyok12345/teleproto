import * as http from "node:http";
import * as https from "node:https";
import type * as net from "node:net";
import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/Obfuscation";
import { NetSocket } from "./socket/NetSocket";
import { ProxyRejectedError } from "../../errors/ProxyRejectedError";
import { Transport, type ResolvedTransport } from "./Transport";

export interface HttpProxyTransportOptions {
    host: string;
    port: number;
    /** Sent with Basic authentication. */
    username?: string;
    password?: string;
    /** Connect to the proxy itself over TLS (an HTTPS proxy). Defaults to false. */
    tls?: boolean;
    /** Proxy handshake timeout in seconds. Defaults to 5. */
    timeout?: number;
}

function openHttpTunnel(
    options: HttpProxyTransportOptions,
    ip: string,
    port: number
): Promise<{ socket: net.Socket; head: Buffer }> {
    const target = ip.includes(":") ? `[${ip}]:${port}` : `${ip}:${port}`;
    const headers: Record<string, string> = { Host: target };
    if (options.username !== undefined) {
        const credentials = `${options.username}:${options.password ?? ""}`;
        headers["Proxy-Authorization"] = `Basic ${Buffer.from(credentials).toString("base64")}`;
    }
    const seconds = options.timeout || 5;
    const request = (options.tls ? https : http).request({
        host: options.host,
        port: options.port,
        method: "CONNECT",
        path: target,
        headers,
        agent: false,
    });
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            request.destroy(
                new Error(`HTTP proxy ${options.host}:${options.port} did not answer within ${seconds}s`)
            );
        }, seconds * 1000);
        request.once("connect", (response, socket, head) => {
            clearTimeout(timer);
            if (response.statusCode !== 200) {
                socket.destroy();
                const message = `HTTP proxy refused CONNECT to ${target}: ${response.statusCode} ${response.statusMessage ?? ""}`.trim();
                const permanent = response.statusCode === 407 || response.statusCode === 403;
                reject(permanent ? new ProxyRejectedError(message) : new Error(message));
                return;
            }
            resolve({ socket, head });
        });
        request.once("error", (error) => {
            clearTimeout(timer);
            reject(error);
        });
        request.end();
    });
}

/** Connects to Telegram through an HTTP proxy that supports CONNECT tunnels. */
export class HttpProxyTransport extends Transport {
    constructor(readonly options: HttpProxyTransportOptions) {
        super();
    }

    resolve(connection?: typeof Connection): ResolvedTransport {
        const options = this.options;
        class HttpProxySocket extends NetSocket {
            protected openTunnel(port: number, ip: string) {
                return openHttpTunnel(options, ip, port);
            }
        }
        return { connection: connection ?? ConnectionTCPObfuscated, socket: HttpProxySocket, proxied: true };
    }
}
