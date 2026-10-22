import type { ProxyInterface } from "../client/TelegramBaseClient";
import type { Connection } from "../network/connection/Connection";
import { ConnectionTCPObfuscated } from "../network/connection/Obfuscation";
import { mtproxyConnection, parseProxySecret } from "../network/transport/MTProxyTransport";
import { Transport, type ResolvedTransport } from "../network/transport/Transport";
import type { SocketFactory as NativeSocketFactory } from "../network/transport/socket/types";
import type { SocketFactory } from "./extensions/SocketInterface";
import { isLegacyProxyConnection } from "./network/connection/TCPMTProxy";

/** Runs a legacy `networkSocket` factory as a {@link Transport}. */
export class LegacySocketTransport extends Transport {
    constructor(
        readonly factory: SocketFactory,
        readonly proxy?: ProxyInterface
    ) {
        super();
        if (proxy && "WEB" in proxy) throw new Error("WEB proxy requires its own socket: remove networkSocket");
    }

    resolve(connection?: typeof Connection): ResolvedTransport {
        const { factory, proxy } = this;
        const socket = function (this: unknown, keepAliveInterval?: number) {
            return new factory(proxy, keepAliveInterval);
        } as unknown as NativeSocketFactory;
        if (proxy && "MTProxy" in proxy) {
            if (connection && !isLegacyProxyConnection(connection)) {
                throw new Error("MTProxy uses its own packet framing: remove the connection option");
            }
            return {
                connection: mtproxyConnection(proxy.ip, proxy.port, parseProxySecret(proxy.secret)),
                socket,
                clientProxy: { address: proxy.ip, port: proxy.port },
                proxied: true,
                webSocket: !!factory.isWebSocket,
            };
        }
        return {
            connection: connection ?? ConnectionTCPObfuscated,
            socket,
            proxied: !!proxy,
            webSocket: !!factory.isWebSocket,
        };
    }
}
