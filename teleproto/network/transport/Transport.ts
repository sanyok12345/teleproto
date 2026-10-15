import type { Connection } from "../connection/Connection";
import type { SocketFactory } from "../../extensions/SocketInterface";
import type { ProxyInterface } from "../connection/TCPMTProxy";
import { ConnectionTCPObfuscated } from "../connection/TCPObfuscated";
import { ConnectionTCPMTProxyAbridged } from "../connection/TCPMTProxy";
import { ConnectionWebProxy, createWebProxySocket } from "../connection/WebProxy";

export interface ResolvedTransport {
    connection: typeof Connection;
    socket: SocketFactory;
    proxy?: ProxyInterface;
    clientProxy?: { address: string; port: number };
}

/**
 * How the client reaches Telegram's data centers: directly, through a proxy or over WebSocket.
 * This is the route, not the MTProto packet framing, which stays the `connection` client option.
 */
export abstract class Transport {
    /** @hidden */
    abstract resolve(connection?: typeof Connection): ResolvedTransport;
}

export function ownFraming(
    transport: string,
    framing: typeof Connection,
    requested?: typeof Connection
): typeof Connection {
    if (requested && requested !== framing) {
        throw new Error(`${transport} uses its own packet framing: remove the connection option`);
    }
    return framing;
}

/** @hidden */
export function resolveLegacyTransport(options: {
    proxy?: ProxyInterface;
    socket: SocketFactory;
    connection: typeof Connection;
    explicitConnection: boolean;
    explicitSocket: boolean;
}): ResolvedTransport {
    let { connection, socket, proxy } = options;
    if (!options.explicitConnection && socket.isWebSocket) {
        connection = ConnectionTCPObfuscated;
    }
    const webProxy = proxy && "WEB" in proxy ? proxy : undefined;
    if (webProxy) {
        if (
            (options.explicitConnection && connection !== ConnectionWebProxy) ||
            options.explicitSocket
        ) {
            throw new Error("WEB proxy requires its own connection and socket adapter");
        }
        const web = createWebProxySocket(webProxy);
        socket = web.socket;
        proxy = { MTProxy: true, ip: web.host, port: 443, secret: web.secret };
    }
    let clientProxy: ResolvedTransport["clientProxy"];
    if (proxy && "MTProxy" in proxy) {
        connection = webProxy ? ConnectionWebProxy : ConnectionTCPMTProxyAbridged;
        clientProxy = { address: proxy.ip, port: proxy.port };
    }
    return { connection, socket, proxy, clientProxy };
}
