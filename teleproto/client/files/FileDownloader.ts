import bigInt from "big-integer";
import { Api } from "../../tl";
import { FileMigrateError, MediaAbortError } from "../../errors";
import { CdnSource } from "./CdnSource";
import Deferred from "../../extensions/Deferred";
import type { FileTransfers, TransferKind } from "./FileTransfers";
import { PartsManager, type Part } from "./PartsManager";
import { ResourceState } from "./ResourceState";
import type { ResourceConsumer, ResourceManager } from "./ResourceManager";
import { Buffer } from "../../platform";

const STAGGER_START_MS = 50;
const STAGGER_MIN_MS = 3;
const STAGGER_FACTOR = 0.8;

export interface PartSink {
    write(offset: number, data: Buffer): Promise<void> | void;
}

export interface DownloadOptions {
    location: Api.TypeInputFileLocation;
    dcId: number;
    kind: TransferKind;
    size?: number;
    partSize: number;
    offset?: number;
    limit?: number;
    precise?: boolean;
    cdn?: boolean;
    stagger?: boolean;
    priority?: number;
    signal?: AbortSignal;
    sink: PartSink;
    onBytes?: (bytes: number) => Promise<void> | void;
    onMigrate?: (dcId: number) => void;
    onCdnUnavailable?: (dcId: number) => void;
    refreshLocation?: () => Promise<Api.TypeInputFileLocation | undefined>;
}

export class FileDownloader implements ResourceConsumer {
    readonly resource: ResourceState;
    readonly parts: PartsManager;
    private readonly manager: ResourceManager;
    private readonly done = new Deferred<void>();
    private location: Api.TypeInputFileLocation;
    private dcId: number;
    private inflight = 0;
    private finished = false;
    private refresh?: Promise<boolean>;
    private cdn?: CdnSource;
    private cdnDisabled = false;
    private nextStartAt = 0;
    private staggerMs = STAGGER_START_MS;

    constructor(
        private readonly transfers: FileTransfers,
        private readonly opts: DownloadOptions
    ) {
        this.location = opts.location;
        this.dcId = opts.dcId;
        this.parts = new PartsManager({ size: opts.size, partSize: opts.partSize, offset: opts.offset, limit: opts.limit });
        this.resource = new ResourceState(opts.partSize);
        this.manager = transfers.manager(opts.kind, opts.dcId);
        this.done.promise.catch(() => {});
    }

    run(): Promise<void> {
        if (this.opts.signal?.aborted) return Promise.reject(new MediaAbortError());
        this.opts.signal?.addEventListener("abort", this.onAbort, { once: true });
        this.manager.register(this, this.opts.priority ?? 1);
        this.loop();
        return this.done.promise;
    }

    onResources() {
        this.loop();
    }

    setAheadLimit(offset: number) {
        this.parts.setAheadLimit(offset);
        this.loop();
    }

    private readonly onAbort = () => this.fail(new MediaAbortError());

    private loop() {
        if (this.finished) return;
        if (this.parts.isReady() && this.inflight === 0) return this.finish();
        while (this.resource.unused >= this.parts.partSize) {
            const part = this.parts.startPart();
            if (!part) break;
            this.resource.startUse(this.parts.partSize);
            this.inflight++;
            void this.fetch(part);
        }
        if (this.resource.updateEstimatedLimit(this.parts.remainingBytes())) this.manager.update();
    }

    private async waitStagger() {
        if (!this.opts.stagger) return;
        const now = Date.now();
        const at = Math.max(now, this.nextStartAt);
        this.nextStartAt = at + this.staggerMs;
        this.staggerMs = Math.max(STAGGER_MIN_MS, this.staggerMs * STAGGER_FACTOR);
        if (at > now) await new Promise((resolve) => setTimeout(resolve, at - now));
    }

    private async fetch(part: Part) {
        let ok = false;
        const location = this.location;
        try {
            await this.waitStagger();
            if (this.finished) return;
            const bytes = await this.download(part, location);
            if (this.finished) return;
            this.parts.onPartOk(part, bytes.length);
            if (bytes.length) {
                await this.opts.sink.write(part.offset, bytes);
                await this.opts.onBytes?.(bytes.length);
            }
            ok = true;
        } catch (error) {
            if (this.finished) return;
            this.parts.onPartFailed(part);
            if (!(await this.recover(error, location))) this.fail(error);
        } finally {
            this.inflight--;
            this.resource.stopUse(this.parts.partSize);
            this.manager.update();
            if (ok || !this.finished) this.loop();
        }
    }

    private async download(part: Part, location: Api.TypeInputFileLocation): Promise<Buffer> {
        if (this.cdn) return this.downloadCdn(part, this.cdn);
        const result = await this.transfers.run(
            this.opts.kind,
            this.dcId,
            () =>
                new Api.upload.GetFile({
                    location,
                    offset: bigInt(part.offset),
                    limit: this.parts.partSize,
                    precise: this.opts.precise,
                    cdnSupported: this.opts.cdn && !this.cdnDisabled ? true : undefined,
                }),
            this.opts.signal
        );
        if (!(result instanceof Api.upload.FileCdnRedirect)) return result.bytes;
        const redirect: Api.upload.FileCdnRedirect = result;
        if (!(await this.transfers.cdnReachable(redirect.dcId))) {
            this.cdnDisabled = true;
            this.opts.onCdnUnavailable?.(redirect.dcId);
            return this.download(part, location);
        }
        let cdn = this.cdn as CdnSource | undefined;
        if (!cdn || !cdn.fileToken.equals(redirect.fileToken)) {
            cdn = this.cdn = new CdnSource(redirect, (offset) =>
                this.transfers.run(
                    this.opts.kind,
                    this.dcId,
                    () => new Api.upload.GetCdnFileHashes({ fileToken: redirect.fileToken, offset: bigInt(offset) }),
                    this.opts.signal
                )
            );
        }
        return this.downloadCdn(part, cdn);
    }

    private async downloadCdn(part: Part, cdn: CdnSource): Promise<Buffer> {
        for (;;) {
            const result = await this.transfers.run(
                "cdn",
                cdn.dcId,
                () => new Api.upload.GetCdnFile({ fileToken: cdn.fileToken, offset: bigInt(part.offset), limit: this.parts.partSize }),
                this.opts.signal
            );
            if (result instanceof Api.upload.CdnFile) {
                const bytes = cdn.decrypt(part.offset, result.bytes);
                await cdn.verify(part.offset, bytes);
                return bytes;
            }
            const hashes = await this.transfers.run(
                this.opts.kind,
                this.dcId,
                () => new Api.upload.ReuploadCdnFile({ fileToken: cdn.fileToken, requestToken: result.requestToken }),
                this.opts.signal
            );
            cdn.addHashes(hashes);
        }
    }

    private async recover(error: unknown, used: Api.TypeInputFileLocation): Promise<boolean> {
        if (error instanceof FileMigrateError) {
            this.dcId = error.newDc;
            this.opts.onMigrate?.(error.newDc);
            return true;
        }
        const message = (error as { errorMessage?: string })?.errorMessage ?? "";
        if (message === "FILE_TOKEN_INVALID") {
            this.cdn = undefined;
            this.cdnDisabled = true;
            return true;
        }
        if (message === "REQUEST_TOKEN_INVALID") return true;
        if (!message.startsWith("FILE_REFERENCE_")) return false;
        if (used !== this.location) return true;
        const refreshLocation = this.opts.refreshLocation;
        if (!refreshLocation) return false;
        this.refresh ??= refreshLocation()
            .then((location) => {
                if (location) this.location = location;
                return !!location;
            })
            .catch(() => false);
        return (await this.refresh) && used !== this.location;
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
