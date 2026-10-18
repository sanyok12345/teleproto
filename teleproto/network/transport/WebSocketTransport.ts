import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/Obfuscation";
import { WebSocketSocket } from "./socket/WebSocketSocket";
import { Transport, type ResolvedTransport } from "./Transport";

/** Connects to Telegram over secure WebSocket. */
export class WebSocketTransport extends Transport {
    resolve(connection?: typeof Connection): ResolvedTransport {
        return {
            connection: connection ?? ConnectionTCPObfuscated,
            socket: WebSocketSocket,
            webSocket: true,
        };
    }
}
