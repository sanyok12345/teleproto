import type { Connection } from "../connection";
import type { RequestState } from "../mtproto/RequestState";
import { InvalidBufferError } from "../../errors";
import { Buffer } from "../../platform";

const TICK_MS = 1_000;
const STALL_MS = 5_000;

export type LinkCloseReason = "lost" | "bad-key" | "flood" | "restart";

export interface LinkClose {
    reason: LinkCloseReason;
    error?: unknown;
}

export interface OutgoingPacket {
    batch: RequestState[];
    data: Buffer;
}

export interface LinkHost {
    nextPacket(link: SessionLink): Promise<OutgoingPacket | undefined>;
    onSent(link: SessionLink, packet: OutgoingPacket): void;
    onSendFailed(packet: OutgoingPacket): void;
    receive(link: SessionLink, body: Buffer): Promise<void>;
    tick(link: SessionLink, now: number, stalled: boolean): void;
    wake(): void;
}

function closeReason(error: unknown): LinkCloseReason {
    if (error instanceof InvalidBufferError) {
        if (error.code === 404) return "bad-key";
        if (error.code === 429) return "flood";
    }
    return "lost";
}

export class SessionLink {
    readonly connectedAt = Date.now();
    readonly closed: Promise<LinkClose>;
    gated: boolean;
    lastPongAt = Date.now();
    lastPingAt = 0;
    private readMark = Date.now();
    private markedAt = Date.now();
    private replyDeadline = 0;
    private lastTickAt = Date.now();
    private timer?: ReturnType<typeof setInterval>;
    private closeInfo?: LinkClose;
    private resolveClosed!: (info: LinkClose) => void;

    constructor(
        readonly connection: Connection,
        private readonly host: LinkHost,
        gated: boolean
    ) {
        this.gated = gated;
        this.closed = new Promise((resolve) => {
            this.resolveClosed = resolve;
        });
    }

    get isClosed() {
        return this.closeInfo !== undefined;
    }

    get lastReadAt() {
        const socketRead = this.connection.socket.lastDataAt ?? 0;
        return socketRead > this.markedAt ? Math.max(this.readMark, socketRead) : this.readMark;
    }

    get quietUntil() {
        return this.replyDeadline;
    }

    start() {
        this.timer = setInterval(() => {
            const now = Date.now();
            const stalled = now - this.lastTickAt > STALL_MS;
            this.lastTickAt = now;
            this.host.tick(this, now, stalled);
        }, TICK_MS);
        this.timer.unref?.();
        void this.readLoop();
        void this.writeLoop();
    }

    open() {
        this.gated = false;
        this.host.wake();
    }

    markRead(at: number) {
        this.readMark = at;
        this.markedAt = Date.now();
    }

    expectReplyBy(deadline: number) {
        this.replyDeadline = Math.max(this.replyDeadline, deadline);
    }

    close(reason: LinkCloseReason, error?: unknown) {
        if (this.closeInfo) return;
        this.closeInfo = { reason, error };
        clearInterval(this.timer);
        this.connection.disconnect().catch(() => {});
        this.host.wake();
        this.resolveClosed(this.closeInfo);
    }

    private async writeLoop() {
        while (!this.isClosed) {
            const packet = await this.host.nextPacket(this);
            if (!packet) continue;
            try {
                await this.connection.send(packet.data);
            } catch (error) {
                this.host.onSendFailed(packet);
                this.close("lost", error);
                return;
            }
            this.host.onSent(this, packet);
        }
    }

    private async readLoop() {
        while (!this.isClosed) {
            let body: Buffer;
            try {
                body = await this.connection.recv();
            } catch (error) {
                this.close(closeReason(error), error);
                return;
            }
            this.markRead(Date.now());
            try {
                await this.host.receive(this, body);
            } catch (error) {
                this.close("lost", error);
                return;
            }
        }
    }
}
