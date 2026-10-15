import type { Connection } from "../connection/Connection";
import { ConnectionTCPMTProxyAbridged } from "../connection/TCPMTProxy";
import { PromisedNetSockets } from "../../extensions/PromisedNetSockets";
import { Transport, ownFraming, type ResolvedTransport } from "./Transport";

export interface MTProxyTransportOptions {
    host: string;
    port: number;
    /** Hex or base64 secret: plain, `dd` random padding or `ee` fake TLS. */
    secret: string;
    /** Connection timeout in seconds. Defaults to 5. */
    timeout?: number;
}

/** Connects to Telegram through an MTProxy server. */
export class MTProxyTransport extends Transport {
    constructor(readonly options: MTProxyTransportOptions) {
        super();
    }

    resolve(connection?: typeof Connection): ResolvedTransport {
        const { host, port, secret, timeout } = this.options;
        return {
            connection: ownFraming("MTProxyTransport", ConnectionTCPMTProxyAbridged, connection),
            socket: PromisedNetSockets,
            proxy: { MTProxy: true, ip: host, port, secret, timeout },
            clientProxy: { address: host, port },
        };
    }
}
