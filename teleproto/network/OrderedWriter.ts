import { BinaryWriter } from "../extensions";

type WriterLike = BinaryWriter | { write: Function; close?: Function };

export type OrderedWriterAfter = (bytes: number) => Promise<void> | void;

export class OrderedWriter {
    nextIdx = 0;
    private readonly _stash = new Map<number, Buffer>();
    private readonly _writer: WriterLike;
    private _draining: Promise<void> = Promise.resolve();

    constructor(writer: WriterLike) {
        this._writer = writer;
    }

    async write(idx: number, data: Buffer, after?: OrderedWriterAfter): Promise<void> {
        if (idx < this.nextIdx) return;
        this._stash.set(idx, data);
        this._draining = this._draining.then(() => this._drain(after));
        await this._draining;
    }

    private async _drain(after?: OrderedWriterAfter): Promise<void> {
        while (this._stash.has(this.nextIdx)) {
            const buf = this._stash.get(this.nextIdx)!;
            this._stash.delete(this.nextIdx);
            // Empty parts still advance nextIdx — otherwise a single zero-byte
            // response (e.g. server-side EOF that's earlier than our advertised
            // size) would freeze the drain and orphan every later part.
            if (buf.length > 0) {
                await this._writer.write(buf);
            }
            this.nextIdx++;
            if (after && buf.length > 0) {
                await after(buf.length);
            }
        }
    }

    reset(toIdx: number): void {
        this.nextIdx = toIdx;
        for (const k of [...this._stash.keys()]) {
            if (k < toIdx) this._stash.delete(k);
        }
    }
}

export class BoundedSemaphore {
    private _available: number;
    private readonly _waiters: Array<() => void> = [];

    constructor(capacity: number) {
        if (capacity < 1) throw new Error("BoundedSemaphore capacity must be >= 1");
        this._available = capacity;
    }

    async acquire(): Promise<void> {
        if (this._available > 0) {
            this._available--;
            return;
        }
        
        await new Promise<void>((resolve) => this._waiters.push(resolve));
    }

    release(): void {
        const next = this._waiters.shift();
        if (next) {
            next(); // slot transferred, counter untouched
            return;
        }
        this._available++;
    }
}
