import type { Connection } from "../connection/Connection";
import { ConnectionTCPFull } from "../connection/TCPFull";
import { PromisedNetSockets } from "../../extensions/PromisedNetSockets";
import { Transport, type ResolvedTransport } from "./Transport";

/** Connects to Telegram directly over TCP. This is the default transport. */
export class TcpTransport extends Transport {
    resolve(connection?: typeof Connection): ResolvedTransport {
        return { connection: connection ?? ConnectionTCPFull, socket: PromisedNetSockets };
    }
}
