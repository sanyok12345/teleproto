import { hmac } from "cifrante";
import { asBuffer } from "../../../Helpers";
import { isIP } from "node:net";

export const WINDOW = 4 * 1024 * 1024;
export const MAX_BATCH = 2 * 1024 * 1024;
export const MAX_PAYLOAD = 1024 * 1024;
export const CHUNK = 64 * 1024;
export const MAX_QUEUE = 32 * 1024 * 1024;
export const MAX_STREAM_QUEUE = 8 * 1024 * 1024;
export const MAX_ITEMS = 8192;
export const enum FrameType { Open = 1, Data, Close, Window, Ping, Pong, Hello = 16, Welcome, Bye = 31 }
export type CarrierMode = "https" | "https-lanes" | "websocket" | "websocket-lanes";

type SocketEventHandler<T = unknown> = { handle(event: T): void }["handle"];

export interface WebProxyWebSocket {
    binaryType: string;
    readonly bufferedAmount: number;
    readonly protocol: string;
    send(data: Uint8Array): void;
    close(): void;
    onopen: SocketEventHandler | null;
    onmessage: SocketEventHandler<{ data: ArrayBuffer | string }> | null;
    onerror: SocketEventHandler | null;
    onclose: SocketEventHandler | null;
}

/** Experimental native transport for the tproxy-server reference bootstrap; no WebView or provider JavaScript. */
export interface WebProxyOptions {
    /** Relay hostname, optionally followed by a base path; HTTPS port 443 is used. */
    server: string;
    secret: string;
    /** Total relay startup deadline in milliseconds. Defaults to 30000. */
    connectTimeoutMs?: number;
    /** HTTP operation and retry deadline in milliseconds. Defaults to 90000. */
    requestTimeoutMs?: number;
    maxStreams?: number;
    /** Optional WebSocket constructor for websocket relay profiles on Node.js 18/20. */
    webSocket?: new (url: string, protocols: string | string[]) => WebProxyWebSocket;
}

export function configure(options: WebProxyOptions) {
    const input = options.server.replace(/^https:\/\//i, "");
    const slash = input.indexOf("/");
    const hostInput = slash < 0 ? input : input.slice(0, slash);
    const path = slash < 0 ? "" : input.slice(slash + 1);
    if (!hostInput || /[\s:@?#%\\]/.test(hostInput) ||
        (slash >= 0 && (!path || path.length > 128 || !/^[A-Za-z0-9][A-Za-z0-9_-]*(\/[A-Za-z0-9][A-Za-z0-9_-]*)*$/.test(path)))) {
        throw new Error("WEB proxy requires a hostname and optional canonical base path");
    }
    const host = new URL(`https://${hostInput}`).hostname;
    if (isIP(host) || host.length > 253 || !host.includes(".") ||
        !host.split(".").every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) {
        throw new Error("WEB proxy requires a DNS hostname");
    }
    const encoded = options.secret;
    let secret: Buffer;
    if (/^(?:[a-fA-F0-9]{2})+$/.test(encoded)) secret = Buffer.from(encoded, "hex");
    else if (/^[A-Za-z0-9+/_-]+={0,2}$/.test(encoded)) {
        secret = Buffer.from(encoded, "base64");
        if (secret.toString("base64url") !== encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")) {
            throw new Error("Invalid WEB proxy secret encoding");
        }
    } else throw new Error("Invalid WEB proxy secret encoding");
    if (secret.length >= 17 && secret[0] === 0x70) secret = secret.subarray(1);
    if (secret.length !== 16 && !(secret.length === 17 && secret[0] === 0xdd)) {
        throw new Error("WEB proxy requires a plain or dd secret; fake TLS secrets are unsupported");
    }
    const connectTimeoutMs = options.connectTimeoutMs ?? 30000;
    const requestTimeoutMs = options.requestTimeoutMs ?? 90000;
    const maxStreams = options.maxStreams ?? 32;
    for (const value of [connectTimeoutMs, requestTimeoutMs, maxStreams]) {
        if (!Number.isSafeInteger(value) || value <= 0 || value > 2147483647) throw new Error("Invalid WEB proxy limit");
    }
    if (maxStreams > 256) throw new Error("WEB proxy maxStreams cannot exceed 256");
    const context = path ? `tdesktop-web-proxy-bridge-v2\n${host}\n${path}` : `tdesktop-web-proxy-bridge-v1\n${host}`;
    const capability = asBuffer(hmac.sha256.sync(secret, context)).toString("base64url");
    return { host, base: `https://${host}/${path ? path + "/" : ""}`, secret: secret.toString("hex"), capability,
        connectTimeoutMs, requestTimeoutMs, maxStreams, webSocket: options.webSocket };
}

export type Configuration = ReturnType<typeof configure>;
export function frame(type: FrameType, id: number, payload: Buffer = Buffer.alloc(0)): Buffer {
    const result = Buffer.allocUnsafe(8 + payload.length);
    result[0] = type;
    result.writeUIntBE(id, 1, 3);
    result.writeUInt32BE(payload.length, 4);
    payload.copy(result, 8);
    return result;
}

export function parseFrames(data: Buffer): { type: number; id: number; payload: Buffer }[] {
    if (!data.length || data.length > MAX_BATCH) throw new Error("Invalid WEB proxy batch size");
    const frames = [];
    for (let offset = 0; offset < data.length;) {
        if (data.length - offset < 8 || frames.length >= 4096) throw new Error("Invalid WEB proxy frame batch");
        const type = data[offset], id = data.readUIntBE(offset + 1, 3), size = data.readUInt32BE(offset + 4);
        const end = offset + 8 + size;
        if (size > MAX_PAYLOAD || end > data.length) throw new Error("Invalid WEB proxy frame length");
        frames.push({ type, id, payload: data.subarray(offset + 8, end) });
        offset = end;
    }
    return frames;
}

export function token(value: string | null): string {
    if (!value || !/^[A-Za-z0-9_-]{43}$/.test(value) || Buffer.from(value, "base64url").toString("base64url") !== value) {
        throw new Error("Invalid WEB proxy token");
    }
    return value;
}
