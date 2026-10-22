import type { ProxyInterface } from "../../../client/TelegramBaseClient";
import { ConnectionTCPObfuscated } from "../../../network/connection/Obfuscation";

export { PaddedIntermediatePacketCodec } from "../../../network/connection/IntermediateCodec";
export type { ProxyInterface, WebProxyType } from "../../../client/TelegramBaseClient";
export type MTProxyType = Extract<ProxyInterface, { MTProxy: true }>;
export type SocksProxyType = Extract<ProxyInterface, { socksType: 4 | 5 }>;

/** @deprecated The proxy picks its own framing: pass `proxy` or an `MTProxyTransport` without `connection`. */
export class TCPMTProxy extends ConnectionTCPObfuscated {}

/** @deprecated The proxy picks its own framing: pass `proxy` or an `MTProxyTransport` without `connection`. */
export class ConnectionTCPMTProxyAbridged extends TCPMTProxy {}

export function isLegacyProxyConnection(connection: unknown): boolean {
    return typeof connection === "function" && connection.prototype instanceof TCPMTProxy;
}
