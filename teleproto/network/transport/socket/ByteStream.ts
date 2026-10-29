import type { PacketReader } from "./types";
import { Buffer } from "../../../platform";

export class ByteQueue {
    private chunks: Buffer[] = [];
    private head = 0;
    private offset = 0;
    bytes = 0;

    get items() {
        return this.chunks.length - this.head;
    }

    push(data: Buffer) {
        if (!data.length) return;
        this.chunks.push(data);
        this.bytes += data.length;
    }

    take(count: number): Buffer {
        count = Math.min(count, this.bytes);
        const first = this.chunks[this.head];
        let out: Buffer;
        if (first && first.length - this.offset >= count) {
            out = first.subarray(this.offset, this.offset + count);
            this.offset += count;
            if (this.offset === first.length) {
                this.chunks[this.head++] = Buffer.alloc(0);
                this.offset = 0;
            }
        } else {
            out = Buffer.allocUnsafe(count);
            let written = 0;
            while (written < count) {
                const chunk = this.chunks[this.head];
                const n = Math.min(count - written, chunk.length - this.offset);
                chunk.copy(out, written, this.offset, this.offset + n);
                written += n;
                this.offset += n;
                if (this.offset === chunk.length) {
                    this.chunks[this.head++] = Buffer.alloc(0);
                    this.offset = 0;
                }
            }
        }
        this.bytes -= count;
        if (this.head >= 128 || !this.bytes) {
            this.chunks = this.chunks.slice(this.head);
            this.head = 0;
        }
        return out;
    }

    clear() {
        this.chunks = [];
        this.head = 0;
        this.offset = 0;
        this.bytes = 0;
    }
}

export class SocketClosedError extends Error {
    constructor(message = "Socket was closed") {
        super(message);
        this.name = "SocketClosedError";
    }
}

export class ByteStream implements PacketReader {
    private readonly queue = new ByteQueue();
    private wake?: () => void;
    private error?: Error;
    lastDataAt = 0;

    get closed() {
        return this.error !== undefined;
    }

    push(data: Buffer) {
        if (this.error) return;
        this.lastDataAt = Date.now();
        this.queue.push(data);
        this.notify();
    }

    end(error: Error = new SocketClosedError()) {
        this.error ??= error;
        this.notify();
    }

    async read(n: number): Promise<Buffer> {
        await this.waitFor(1);
        return this.queue.take(n);
    }

    async readExactly(n: number): Promise<Buffer> {
        await this.waitFor(n);
        return this.queue.take(n);
    }

    private async waitFor(n: number) {
        while (this.queue.bytes < n) {
            if (this.error) throw this.error;
            await new Promise<void>((resolve) => {
                this.wake = resolve;
            });
        }
    }

    private notify() {
        const wake = this.wake;
        this.wake = undefined;
        wake?.();
    }
}
