import type { Connection } from "../connection/Connection";
import { ConnectionTCPFull } from "../connection/TCPFull";
import { PromisedNetSockets } from "../../extensions/PromisedNetSockets";
import { Transport, type ResolvedTransport } from "./Transport";

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

/** Connects to Telegram through a SOCKS4 or SOCKS5 proxy. */
export class SocksTransport extends Transport {
    constructor(readonly options: SocksTransportOptions) {
        super();
    }

    resolve(connection?: typeof Connection): ResolvedTransport {
        const { host, port, version, username, password, timeout } = this.options;
        return {
            connection: connection ?? ConnectionTCPFull,
            socket: PromisedNetSockets,
            proxy: { socksType: version, ip: host, port, username, password, timeout },
        };
    }
}
