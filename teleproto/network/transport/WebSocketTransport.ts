import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/Obfuscation";
import { WebSocketSocket, type WebSocketLike } from "./socket/WebSocketSocket";
import { Transport, type ResolvedTransport } from "./Transport";

export type { WebSocketLike } from "./socket/WebSocketSocket";

/** Connects to Telegram over secure WebSocket. */
export class WebSocketTransport extends Transport {
    /** Creates the WebSocket for each connection. Override it to use another implementation or route. */
    webSocket?(url: string, protocols: string | string[]): WebSocketLike;

    resolve(connection?: typeof Connection): ResolvedTransport {
        if (!this.webSocket) return { connection: connection ?? ConnectionTCPObfuscated, socket: WebSocketSocket, webSocket: true };
        const create = this.webSocket.bind(this);
        class CustomWebSocket extends WebSocketSocket {
            protected create(url: string, protocols: string | string[]) {
                return create(url, protocols);
            }
        }
        return { connection: connection ?? ConnectionTCPObfuscated, socket: CustomWebSocket, webSocket: true };
    }
}
