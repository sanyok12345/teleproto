import type bigInt from "big-integer";
import { Api } from "../../tl";
import { MediaAbortError } from "../../errors";
import Deferred from "../../extensions/Deferred";
import type { FileTransfers } from "./FileTransfers";
import { PartsManager, type Part } from "./PartsManager";
import { ResourceState } from "./ResourceState";
import type { ResourceConsumer, ResourceManager } from "./ResourceManager";

export const BIG_FILE_SIZE = 10 * 1024 * 1024;

export interface UploadOptions {
    fileId: bigInt.BigInteger;
    size: number;
    partSize: number;
    dcId: number;
    maxInflight?: number;
    read(offset: number, length: number): Promise<Buffer>;
    signal?: AbortSignal;
    onPart?: () => void;
}

export class FileUploader implements ResourceConsumer {
    readonly resource: ResourceState;
    readonly parts: PartsManager;
    readonly isBig: boolean;
    private readonly manager: ResourceManager;
    private readonly done = new Deferred<void>();
    private inflight = 0;
    private finished = false;

    constructor(
        private readonly transfers: FileTransfers,
        private readonly opts: UploadOptions
    ) {
        this.isBig = opts.size > BIG_FILE_SIZE;
        this.parts = new PartsManager({ size: opts.size, partSize: opts.partSize });
        this.resource = new ResourceState(opts.partSize);
        this.manager = transfers.manager("upload", opts.dcId);
        this.done.promise.catch(() => {});
    }

    get partCount(): number {
        return Math.ceil(this.opts.size / this.opts.partSize);
    }

    run(): Promise<void> {
        if (this.opts.signal?.aborted) return Promise.reject(new MediaAbortError());
        this.opts.signal?.addEventListener("abort", this.onAbort, { once: true });
        this.manager.register(this, -1);
        this.loop();
        return this.done.promise;
    }

    onResources() {
        this.loop();
    }

    private readonly onAbort = () => this.fail(new MediaAbortError());

    private loop() {
        if (this.finished) return;
        if (this.parts.isReady() && this.inflight === 0) return this.finish();
        while (this.resource.unused >= this.parts.partSize && this.inflight < (this.opts.maxInflight ?? Infinity)) {
            const part = this.parts.startPart();
            if (!part) break;
            this.resource.startUse(this.parts.partSize);
            this.inflight++;
            void this.send(part);
        }
        if (this.resource.updateEstimatedLimit(this.parts.remainingBytes())) this.manager.update();
    }

    private async send(part: Part) {
        try {
            const bytes = await this.opts.read(part.offset, part.size);
            if (this.finished) return;
            const { fileId } = this.opts;
            const ok = await this.transfers.run(
                "upload",
                this.opts.dcId,
                () =>
                    this.isBig
                        ? new Api.upload.SaveBigFilePart({ fileId, filePart: part.id, fileTotalParts: this.partCount, bytes })
                        : new Api.upload.SaveFilePart({ fileId, filePart: part.id, bytes }),
                this.opts.signal
            );
            if (this.finished) return;
            if (ok !== true) throw new Error(`Telegram refused upload part ${part.id}`);
            this.parts.onPartOk(part, bytes.length);
            this.opts.onPart?.();
        } catch (error) {
            this.parts.onPartFailed(part);
            this.fail(error);
        } finally {
            this.inflight--;
            this.resource.stopUse(this.parts.partSize);
            this.manager.update();
            this.loop();
        }
    }

    private finish() {
        if (this.finished) return;
        this.finished = true;
        this.release();
        this.done.resolve();
    }

    private fail(error: unknown) {
        if (this.finished) return;
        this.finished = true;
        this.release();
        this.done.reject(error);
    }

    private release() {
        this.opts.signal?.removeEventListener("abort", this.onAbort);
        this.manager.unregister(this);
    }
}
