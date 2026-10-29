import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/Obfuscation";
import { NetSocket } from "./socket/NetSocket";
import { ProxyRejectedError } from "../../errors/ProxyRejectedError";
import { Transport, type ResolvedTransport } from "./Transport";
import { Buffer, net } from "../../platform";

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

async function openHttpTunnel(
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
    const response = await net.httpConnect({
        host: options.host,
        port: options.port,
        tls: !!options.tls,
        target,
        headers,
        timeoutMs: seconds * 1000,
        timeoutError: () => new Error(`HTTP proxy ${options.host}:${options.port} did not answer within ${seconds}s`),
    });
    if (response.statusCode !== 200) {
        response.socket.destroy();
        const message = `HTTP proxy refused CONNECT to ${target}: ${response.statusCode} ${response.statusMessage ?? ""}`.trim();
        const permanent = response.statusCode === 407 || response.statusCode === 403;
        throw permanent ? new ProxyRejectedError(message) : new Error(message);
    }
    return { socket: response.socket, head: response.head };
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
