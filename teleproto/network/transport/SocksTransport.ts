import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/Obfuscation";
import { NetSocket } from "./socket/NetSocket";
import { ProxyRejectedError } from "../../errors/ProxyRejectedError";
import { Transport, type ResolvedTransport } from "./Transport";
import { net } from "../../platform";

export interface SocksTransportOptions {
    host: string;
    port: number;
    version: 4 | 5;
    /** SOCKS5 only. */
    username?: string;
    /** SOCKS5 only. */
    password?: string;
    /** Proxy handshake timeout in seconds. Defaults to 5. */
    timeout?: number;
}

export async function openSocksTunnel(
    options: SocksTransportOptions,
    ip: string,
    port: number
): Promise<{ socket: net.Socket }> {
    try {
        const socket = await net.socksConnect({
            host: options.host,
            port: options.port,
            version: options.version,
            username: options.username,
            password: options.password,
            timeoutMs: (options.timeout || 5) * 1000,
            destination: { host: ip, port },
        });
        return { socket };
    } catch (error) {
        if (error instanceof Error && /Authentication failed/i.test(error.message)) {
            throw new ProxyRejectedError(
                `SOCKS5 proxy ${options.host}:${options.port} rejected the credentials`
            );
        }
        throw error;
    }
}

/** Connects to Telegram through a SOCKS4 or SOCKS5 proxy. */
export class SocksTransport extends Transport {
    constructor(readonly options: SocksTransportOptions) {
        super();
    }

    resolve(connection?: typeof Connection): ResolvedTransport {
        const options = this.options;
        class SocksSocket extends NetSocket {
            protected openTunnel(port: number, ip: string) {
                return openSocksTunnel(options, ip, port);
            }
        }
        return {
            connection: connection ?? ConnectionTCPObfuscated,
            socket: SocksSocket,
            proxied: true,
        };
    }
}
