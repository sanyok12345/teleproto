import type { ProxyInterface } from "../../client/TelegramBaseClient";
import { NetSocket } from "../../network/transport/socket/NetSocket";
import { openSocksTunnel } from "../../network/transport/SocksTransport";

const ALL = 0x7fffffff;

/** @deprecated Use {@link TcpTransport} or {@link SocksTransport}. */
export class PromisedNetSockets extends NetSocket {
    constructor(
        private readonly proxy?: ProxyInterface,
        keepAliveInterval?: number
    ) {
        super(keepAliveInterval);
    }

    protected async openTunnel(port: number, ip: string) {
        const proxy = this.proxy;
        if (!proxy || !("socksType" in proxy)) return undefined;
        return openSocksTunnel(
            {
                host: proxy.ip,
                port: proxy.port,
                version: proxy.socksType,
                username: proxy.username,
                password: proxy.password,
                timeout: proxy.timeout,
            },
            ip,
            port
        );
    }

    readAll(): Promise<Buffer> {
        return this.read(ALL);
    }

    toString() {
        return "PromisedNetSockets";
    }
}
