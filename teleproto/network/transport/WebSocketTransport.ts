import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/TCPObfuscated";
import { PromisedWebSockets } from "../../extensions/PromisedWebSockets";
import { Transport, type ResolvedTransport } from "./Transport";

/** Connects to Telegram over secure WebSocket. */
export class WebSocketTransport extends Transport {
    resolve(connection?: typeof Connection): ResolvedTransport {
        return { connection: connection ?? ConnectionTCPObfuscated, socket: PromisedWebSockets };
    }
}
