import type { Connection } from "../connection/Connection";
import { ConnectionWebProxy, createWebProxySocket } from "../connection/WebProxy";
import type { WebProxyOptions } from "../connection/WebProxy";
import { Transport, ownFraming, type ResolvedTransport } from "./Transport";

/** Connects to Telegram through a WEB relay. Experimental. */
export class WebProxyTransport extends Transport {
    constructor(readonly options: WebProxyOptions) {
        super();
    }

    resolve(connection?: typeof Connection): ResolvedTransport {
        const framing = ownFraming("WebProxyTransport", ConnectionWebProxy, connection);
        const web = createWebProxySocket(this.options);
        return {
            connection: framing,
            socket: web.socket,
            proxy: { MTProxy: true, ip: web.host, port: 443, secret: web.secret },
            clientProxy: { address: web.host, port: 443 },
        };
    }
}
