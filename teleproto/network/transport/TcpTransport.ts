import type { Connection } from "../connection/Connection";
import { ConnectionTCPObfuscated } from "../connection/Obfuscation";
import { NetSocket } from "./socket/NetSocket";
import { Transport, type ResolvedTransport } from "./Transport";

/** Connects to Telegram directly over TCP. This is the default transport. */
export class TcpTransport extends Transport {
    resolve(connection?: typeof Connection): ResolvedTransport {
        return { connection: connection ?? ConnectionTCPObfuscated, socket: NetSocket };
    }
}
