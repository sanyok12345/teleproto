import type { ProxyInterface } from "../../client/TelegramBaseClient";
import { WebSocketSocket } from "../../network/transport/socket/WebSocketSocket";

const ALL = 0x7fffffff;

/** @deprecated Use {@link WebSocketTransport}. */
export class PromisedWebSockets extends WebSocketSocket {
    static readonly isWebSocket = true;

    constructor(proxy?: ProxyInterface, _keepAliveInterval?: number) {
        super();
        if (proxy && !("MTProxy" in proxy)) throw new Error("Socks proxies are not supported over the WebSocket transport");
    }

    readAll(): Promise<Buffer> {
        return this.read(ALL);
    }

    toString() {
        return "PromisedWebSockets";
    }
}
