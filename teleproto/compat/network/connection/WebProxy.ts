import { TCPMTProxy } from "./TCPMTProxy";

export { createWebProxySocket, type WebProxyOptions, type WebProxyWebSocket } from "../../../network/transport/WebProxyTransport";

/** @deprecated The WEB proxy picks its own framing: pass `proxy.WEB` or a `WebProxyTransport` without `connection`. */
export class ConnectionWebProxy extends TCPMTProxy {}
