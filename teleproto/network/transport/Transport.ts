import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/Obfuscation";
import { NetSocket } from "./socket/NetSocket";
import type { SocketFactory, TransportStream } from "./socket/types";

export type { TransportStream } from "./socket/types";

export interface ResolvedTransport {
    connection: typeof Connection;
    socket: SocketFactory;
    clientProxy?: { address: string; port: number };
    proxied?: boolean;
    webSocket?: boolean;
}

/** A Telegram data center address to open a stream to. */
export interface TransportAddress {
    host: string;
    port: number;
}

/**
 * How the client reaches Telegram: directly, through a proxy or over WebSocket.
 * A custom route implements {@link connect}; teleproto keeps the MTProto framing, obfuscation and reconnects.
 */
export abstract class Transport {
    /** Opens a connected stream to `address`, such as a `net.Socket` or any duplex stream. */
    connect?(address: TransportAddress): Promise<TransportStream>;

    /** @hidden */
    resolve(connection?: typeof Connection): ResolvedTransport {
        if (!this.connect) throw new Error(`${this.constructor.name} must implement connect()`);
        const connect = this.connect.bind(this);
        class StreamSocket extends NetSocket {
            protected async openTunnel(port: number, host: string) {
                return { socket: await connect({ host, port }) };
            }
        }
        return { connection: connection ?? ConnectionTCPObfuscated, socket: StreamSocket };
    }
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
