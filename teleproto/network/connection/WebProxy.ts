import { ConnectionTCPMTProxyAbridged } from "./TCPMTProxy";
export { createWebProxySocket } from "./webProxy/transport";
export type { WebProxyOptions, WebProxyWebSocket } from "./webProxy/protocol";

/** MTProxy framing over a native WEB relay; configure through proxy.WEB. */
export class ConnectionWebProxy extends ConnectionTCPMTProxyAbridged {
    async connect(): Promise<void> {
        try { await super.connect(); }
        catch (error) { await this.socket.close(); throw error; }
    }

    async disconnect(): Promise<void> {
        this._connected = false;
        await this.socket.close();
    }
}
