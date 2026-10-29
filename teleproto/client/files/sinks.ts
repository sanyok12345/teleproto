import { Writer } from "../../tl/binary/Writer";
import type { OutFile } from "../../define";
import type { PartSink } from "./FileDownloader";
import { Buffer, fs, type FileHandle } from "../../platform";

export interface DownloadTarget extends PartSink {
    close(): Promise<Buffer | string | undefined>;
    abort(): Promise<void>;
}

type UserWriter = { write: Function; close?: Function; end?: Function };

class FileTarget implements DownloadTarget {
    private constructor(
        private readonly handle: FileHandle,
        private readonly filePath: string
    ) {}

    static async open(filePath: string): Promise<FileTarget> {
        return new FileTarget(await fs.open(filePath, "w"), filePath);
    }

    async write(offset: number, data: Buffer) {
        let written = 0;
        while (written < data.length) {
            const { bytesWritten } = await this.handle.write(data, written, data.length - written, offset + written);
            written += bytesWritten;
        }
    }

    async close() {
        await this.handle.close();
        return fs.resolve(this.filePath);
    }

    async abort() {
        await this.handle.close().catch(() => {});
    }
}

class BufferTarget implements DownloadTarget {
    private buffer?: Buffer;
    private readonly chunks = new Map<number, Buffer>();
    private end = 0;

    constructor(size?: number) {
        if (size !== undefined && size > 0) this.buffer = Buffer.allocUnsafe(size);
    }

    write(offset: number, data: Buffer) {
        this.end = Math.max(this.end, offset + data.length);
        if (this.buffer && this.end <= this.buffer.length) data.copy(this.buffer, offset);
        else this.chunks.set(offset, data);
    }

    async close() {
        if (!this.chunks.size) return this.buffer ? this.buffer.subarray(0, this.end) : Buffer.alloc(0);
        const out = Buffer.alloc(this.end);
        if (this.buffer) this.buffer.copy(out, 0, 0, Math.min(this.buffer.length, this.end));
        for (const [offset, data] of this.chunks) data.copy(out, offset);
        return out;
    }

    async abort() {}
}

export class OrderedSink implements PartSink {
    private readonly stash = new Map<number, Buffer>();
    private draining: Promise<void> = Promise.resolve();

    constructor(
        private next: number,
        private readonly emit: (offset: number, data: Buffer) => Promise<void> | void
    ) {}

    write(offset: number, data: Buffer): Promise<void> {
        this.stash.set(offset, data);
        this.draining = this.draining.then(() => this.drain());
        return this.draining;
    }

    private async drain() {
        for (;;) {
            const data = this.stash.get(this.next);
            if (!data) return;
            this.stash.delete(this.next);
            const offset = this.next;
            this.next += data.length;
            await this.emit(offset, data);
        }
    }
}

class WriterTarget implements DownloadTarget {
    private readonly ordered: OrderedSink;

    constructor(private readonly writer: UserWriter) {
        this.ordered = new OrderedSink(0, (_offset, data) => this.writer.write(data));
    }

    write(offset: number, data: Buffer) {
        return this.ordered.write(offset, data);
    }

    async close() {
        const writer = this.writer;
        if (fs.isFileStream(writer)) {
            await new Promise<void>((resolve, reject) => {
                writer.once("error", reject);
                writer.end(() => resolve());
            });
            return typeof writer.path === "string" ? fs.resolve(writer.path) : Buffer.from(writer.path);
        }
        if (writer instanceof Writer) return writer.getValue();
        if (typeof writer.close === "function") await writer.close();
        return undefined;
    }

    async abort() {
        if (fs.isFileStream(this.writer)) this.writer.destroy();
    }
}

export async function openTarget(outputFile: OutFile | undefined, size?: number): Promise<DownloadTarget> {
    if (typeof outputFile === "string") return FileTarget.open(outputFile);
    if (!outputFile || Buffer.isBuffer(outputFile)) return new BufferTarget(size);
    return new WriterTarget(outputFile as UserWriter);
}
