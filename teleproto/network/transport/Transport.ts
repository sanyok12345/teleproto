import type { Connection } from "../connection/Connection";
import type { SocketFactory } from "./socket/types";

export interface ResolvedTransport {
    connection: typeof Connection;
    socket: SocketFactory;
    clientProxy?: { address: string; port: number };
    proxied?: boolean;
    webSocket?: boolean;
}

/** How the client reaches Telegram: directly, through a proxy or over WebSocket. */
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
