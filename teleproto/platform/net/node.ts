import http from "node:http";
import https from "node:https";
import nodeNet from "node:net";
import { SocksClient } from "socks";
import type { HttpConnectOptions, HttpConnectResponse, SocksConnectOptions } from "./types";

export type Socket = nodeNet.Socket;

export const tcp = true;

export function createSocket(): Socket {
    return new nodeNet.Socket();
}

export function isIP(host: string): number {
    return nodeNet.isIP(host);
}

export function httpConnect(options: HttpConnectOptions): Promise<HttpConnectResponse<Socket>> {
    const request = (options.tls ? https : http).request({
        host: options.host,
        port: options.port,
        method: "CONNECT",
        path: options.target,
        headers: options.headers,
        agent: false,
    });
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => request.destroy(options.timeoutError()), options.timeoutMs);
        request.once("connect", (response, socket, head) => {
            clearTimeout(timer);
            resolve({ statusCode: response.statusCode, statusMessage: response.statusMessage, socket, head });
        });
        request.once("error", (error) => {
            clearTimeout(timer);
            reject(error);
        });
        request.end();
    });
}

export async function socksConnect(options: SocksConnectOptions): Promise<Socket> {
    const info = await SocksClient.createConnection({
        proxy: {
            host: options.host,
            port: options.port,
            type: options.version,
            userId: options.username,
            password: options.password,
        },
        command: "connect",
        timeout: options.timeoutMs,
        destination: options.destination,
    });
    return info.socket;
}
