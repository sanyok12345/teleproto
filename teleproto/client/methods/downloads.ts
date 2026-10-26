import { Api } from "../../tl";
import type { TelegramClient } from "../TelegramClient";
import { strippedPhotoToJpg } from "../../Utils";
import { EntityLike, OutFile, ProgressCallback } from "../../define";
import * as utils from "../../Utils";
import * as fs from "fs";
import path from "path";
import bigInt from "big-integer";
import { MediaAbortError } from "../../errors";
import { FileDownloader } from "../files/FileDownloader";
import { transferKindFor } from "../files/FileTransfers";
import { choosePartSize } from "../files/PartsManager";
import { OrderedSink, openTarget, type DownloadTarget } from "../files/sinks";
import { crypto } from "../../platform";

export interface progressCallback {
    (
        downloaded: bigInt.BigInteger,
        fullSize: bigInt.BigInteger,
        ...args: any[]
    ): void;
    isCanceled?: boolean;
    acceptsBuffer?: boolean;
}

export interface DownloadCancelParams {
    signal?: AbortSignal;
    requestTimeout?: number;
}

export interface DownloadFileParams extends DownloadCancelParams {
    outputFile?: OutFile;
    dcId?: number;
    fileSize?: bigInt.BigInteger;
    partSizeKb?: number;
    progressCallback?: progressCallback;
    msgData?: [EntityLike, number];
    verifyHashes?: boolean;
}

export interface DownloadProfilePhotoParams extends DownloadCancelParams {
    isBig?: boolean;
    outputFile?: OutFile;
}

const sizeTypes = ["w", "y", "d", "x", "c", "m", "b", "a", "s"];

const MIN_CHUNK_SIZE = 4096;
const ONE_MB = 1024 * 1024;
const ITER_AHEAD_BYTES = 4 * ONE_MB;

function explicitPartSize(partSizeKb?: number): number | undefined {
    if (!partSizeKb || partSizeKb <= 0) return undefined;
    const size = Math.min(Math.floor(partSizeKb * 1024), ONE_MB);
    if (size % MIN_CHUNK_SIZE !== 0) throw new Error("partSizeKb must be a multiple of 4 (KB)");
    return size;
}

const HASH_BLOCK = 128 * 1024;

class FileHashChecker {
    private readonly _hashes = new Map<number, Buffer>();
    private _unsupported = false;
    private pending: Buffer = Buffer.alloc(0);
    private pendingOffset = 0;

    constructor(
        private readonly client: TelegramClient,
        private readonly location: Api.TypeInputFileLocation
    ) {}

    async verify(absOffset: number, data: Buffer): Promise<void> {
        if (this._unsupported || !data.length) return;
        if (absOffset % HASH_BLOCK !== 0) return; // parts are block-aligned
        for (let o = 0; o < data.length; o += HASH_BLOCK) {
            const abs = absOffset + o;
            let expected = this._hashes.get(abs);
            if (!expected) {
                await this._fetch(abs);
                expected = this._hashes.get(abs);
            }
            if (!expected) return; // unsupported location or past EOF
            const block = data.subarray(o, Math.min(o + HASH_BLOCK, data.length));
            const actual = crypto.hash("sha256", block);
            if (!actual.equals(expected)) {
                throw new Error(
                    `File hash mismatch at offset ${abs} — corrupted part`
                );
            }
        }
    }

    async feed(offset: number, data: Buffer, final = false): Promise<void> {
        if (!this.pending.length) this.pendingOffset = offset;
        this.pending = this.pending.length ? Buffer.concat([this.pending, data]) : data;
        const whole = final ? this.pending.length : this.pending.length - (this.pending.length % HASH_BLOCK);
        if (!whole) return;
        await this.verify(this.pendingOffset, this.pending.subarray(0, whole));
        this.pendingOffset += whole;
        this.pending = this.pending.subarray(whole);
    }

    private async _fetch(absOffset: number): Promise<void> {
        try {
            const res = await this.client.invoke(
                new Api.upload.GetFileHashes({
                    location: this.location,
                    offset: bigInt(absOffset),
                })
            );
            for (const h of res) {
                this._hashes.set(h.offset.toJSNumber(), Buffer.from(h.hash));
            }
        } catch (e) {
            this._unsupported = true;
            this.client._log.debug(`getFileHashes unsupported: ${e}`);
        }
    }
}

/** @hidden */
export async function downloadFile(
    client: TelegramClient,
    inputLocation: Api.TypeInputFileLocation,
    {
        outputFile = undefined,
        partSizeKb = undefined,
        fileSize = undefined,
        progressCallback = undefined,
        dcId = undefined,
        msgData = undefined,
        verifyHashes = false,
        signal = undefined,
        requestTimeout = undefined,
    }: DownloadFileParams
): Promise<Buffer | string | undefined> {
    const info = utils.getFileInfo(inputLocation);
    const location = (info.location ?? inputLocation) as Api.TypeInputFileLocation;
    const totalSize = fileSize ?? info.size;
    const size = totalSize && totalSize.greater(0) ? totalSize.toJSNumber() : undefined;
    const abort = new AbortController();
    const forward = () => abort.abort();
    if (signal?.aborted) abort.abort();
    else signal?.addEventListener("abort", forward, { once: true });
    const timer = requestTimeout && requestTimeout > 0 ? setTimeout(forward, requestTimeout) : undefined;

    const dc = dcId ?? info.dcId ?? client.session.dcId;
    let release: (() => void) | undefined;
    try {
        release = await client._files.acquireDownload(dc, size, abort.signal);
    } catch (error) {
        clearTimeout(timer);
        signal?.removeEventListener("abort", forward);
        throw error;
    }
    const target: DownloadTarget = await openTarget(outputFile, size).catch((error) => {
        release?.();
        clearTimeout(timer);
        signal?.removeEventListener("abort", forward);
        throw error;
    });
    const hashes = verifyHashes ? new FileHashChecker(client, location) : undefined;
    const sink = hashes
        ? new OrderedSink(0, async (offset, data) => {
              await hashes.feed(offset, data);
              await target.write(offset, data);
          })
        : target;
    let downloaded = 0;
    const downloader = new FileDownloader(client._files, {
        location,
        dcId: dc,
        kind: transferKindFor(size),
        size,
        partSize: explicitPartSize(partSizeKb) ?? choosePartSize(size, client._files.maxPartSize),
        cdn: client._files.cdnEnabled,
        onCdnUnavailable: (cdnDc) => client._log.info(`CDN dc ${cdnDc} is not announced in the config, downloading directly`),
        stagger: location instanceof Api.InputDocumentFileLocation && (size ?? 0) > ONE_MB,
        signal: abort.signal,
        sink,
        refreshLocation: msgData ? () => refreshFileLocation(client, location, msgData) : undefined,
        onBytes: async (bytes) => {
            downloaded += bytes;
            if (!progressCallback) return;
            if (progressCallback.isCanceled) {
                abort.abort();
                return;
            }
            await progressCallback(bigInt(downloaded), bigInt(size ?? downloaded));
        },
    });
    try {
        await downloader.run();
        await hashes?.feed(downloaded, Buffer.alloc(0), true);
        return await target.close();
    } catch (error) {
        await target.abort();
        if (error instanceof MediaAbortError && progressCallback?.isCanceled) return undefined;
        throw error;
    } finally {
        release();
        clearTimeout(timer);
        signal?.removeEventListener("abort", forward);
    }
}

async function refreshFileLocation(
    client: TelegramClient,
    location: Api.TypeInputFileLocation,
    [chat, id]: [EntityLike, number]
): Promise<Api.TypeInputFileLocation | undefined> {
    const [message] = await client.getMessages(chat, { ids: id });
    const media = message?.media;
    const fresh =
        media instanceof Api.MessageMediaDocument ? media.document : media instanceof Api.MessageMediaPhoto ? media.photo : undefined;
    if (!(fresh instanceof Api.Document || fresh instanceof Api.Photo)) return undefined;
    if (location instanceof Api.InputDocumentFileLocation || location instanceof Api.InputPhotoFileLocation) {
        if (!location.id.equals(fresh.id)) return undefined;
        const Location = location.constructor as new (args: object) => Api.TypeInputFileLocation;
        return new Location({ ...location.originalArgs, fileReference: fresh.fileReference });
    }
    return undefined;
}

export interface DownloadMediaInterface extends DownloadCancelParams {
    outputFile?: OutFile;
    thumb?: number | Api.TypePhotoSize;
    progressCallback?: ProgressCallback;
}

/** @hidden */
export async function downloadMedia(
    client: TelegramClient,
    messageOrMedia: Api.Message | Api.TypeMessageMedia,
    outputFile?: OutFile,
    thumb?: number | Api.TypePhotoSize,
    progressCallback?: ProgressCallback,
    extra?: DownloadCancelParams
): Promise<Buffer | string | undefined> {
    let msgData: [EntityLike, number] | undefined;
    let date;
    let media;

    if (messageOrMedia instanceof Api.Message) {
        media = messageOrMedia.media;
        date = messageOrMedia.date;
        msgData = messageOrMedia.inputChat
            ? [messageOrMedia.inputChat, messageOrMedia.id]
            : undefined;
    } else {
        media = messageOrMedia;
        date = Date.now();
    }
    if (typeof media == "string") {
        throw new Error("not implemented");
    }
    if (
        media instanceof Api.UserProfilePhoto ||
        media instanceof Api.ChatPhoto
    ) {
        throw new Error(
            `${
                (media as any).className
            } cannot be downloaded from the photo object alone its file location is bound to the owner: use client.downloadProfilePhoto(entity)`
        );
    }
    if (media instanceof Api.MessageMediaWebPage) {
        if (media.webpage instanceof Api.WebPage) {
            media = media.webpage.document || media.webpage.photo;
        }
    }
    if (media instanceof Api.MessageMediaPhoto || media instanceof Api.Photo) {
        return _downloadPhoto(
            client,
            media,
            outputFile,
            date,
            thumb,
            progressCallback,
            extra
        );
    } else if (
        media instanceof Api.MessageMediaDocument ||
        media instanceof Api.Document
    ) {
        return _downloadDocument(
            client,
            media,
            outputFile,
            date,
            thumb,
            progressCallback,
            msgData,
            extra
        );
    } else if (media instanceof Api.MessageMediaContact) {
        return _downloadContact(client, media, { outputFile, ...extra });
    } else if (
        media instanceof Api.WebDocument ||
        media instanceof Api.WebDocumentNoProxy
    ) {
        return _downloadWebDocument(client, media, { outputFile, progressCallback, ...extra });
    } else if (!media) {
        return undefined;
    } else {
        throw new Error(
            `Cannot download media of type ${
                (media as any).className ?? typeof media
            }`
        );
    }
}

/** @hidden */
export async function _downloadDocument(
    client: TelegramClient,
    doc: Api.MessageMediaDocument | Api.TypeDocument,
    outputFile: OutFile | undefined,
    date: number,
    thumb?: number | string | Api.TypePhotoSize,
    progressCallback?: ProgressCallback,
    msgData?: [EntityLike, number],
    extra?: DownloadCancelParams
): Promise<Buffer | string | undefined> {
    if (doc instanceof Api.MessageMediaDocument) {
        if (!doc.document) {
            return Buffer.alloc(0);
        }
        doc = doc.document;
    }
    if (!(doc instanceof Api.Document)) {
        return Buffer.alloc(0);
    }
    let size;
    if (thumb == undefined) {
        outputFile = getProperFilename(
            outputFile,
            "document",
            "." + (utils.getExtension(doc) || "bin"),
            date
        );
    } else {
        outputFile = getProperFilename(outputFile, "photo", ".jpg", date);
        size = getThumb(doc.thumbs || [], thumb);
        if (
            size instanceof Api.PhotoCachedSize ||
            size instanceof Api.PhotoStrippedSize
        ) {
            return _downloadCachedPhotoSize(size, outputFile);
        }
    }
    return await downloadFile(
        client,
        new Api.InputDocumentFileLocation({
            id: doc.id,
            accessHash: doc.accessHash,
            fileReference: doc.fileReference,
            thumbSize: size && "type" in size ? size.type : "",
        }),
        {
            outputFile: outputFile,
            fileSize: size && "size" in size ? bigInt(size.size) : doc.size,
            progressCallback: progressCallback,
            dcId: doc.dcId,
            msgData: msgData,
            signal: extra?.signal,
            requestTimeout: extra?.requestTimeout,
        }
    );
}

/** @hidden */
export async function _downloadContact(
    _client: TelegramClient,
    media: Api.MessageMediaContact,
    args: DownloadMediaInterface
): Promise<Buffer | string | undefined> {
    const vcard =
        media.vcard ||
        [
            "BEGIN:VCARD",
            "VERSION:4.0",
            `N:${media.lastName};${media.firstName};;;`,
            `FN:${[media.firstName, media.lastName].filter(Boolean).join(" ")}`,
            `TEL;TYPE=cell:${media.phoneNumber}`,
            "END:VCARD",
        ].join("\r\n");
    const data = Buffer.from(vcard, "utf8");
    const target = await openTarget(args.outputFile, data.length);
    await target.write(0, data);
    return target.close();
}

const WEB_FILE_PART = 128 * 1024;

/** @hidden */
export async function _downloadWebDocument(
    client: TelegramClient,
    media: Api.WebDocument | Api.WebDocumentNoProxy,
    args: DownloadMediaInterface
): Promise<Buffer | string | undefined> {
    const target = await openTarget(args.outputFile, media.size || undefined);
    try {
        if (media instanceof Api.WebDocumentNoProxy) {
            const response = await fetch(media.url, { signal: args.signal });
            if (!response.ok) throw new Error(`Fetching ${media.url} failed with HTTP ${response.status}`);
            const data = Buffer.from(await response.arrayBuffer());
            await target.write(0, data);
            await args.progressCallback?.(bigInt(data.length), bigInt(data.length));
            return await target.close();
        }
        if (!client._config) await client.getDC(client.session.dcId);
        const dcId = client._config?.webfileDcId ?? client.session.dcId;
        const location = new Api.InputWebFileLocation({ url: media.url, accessHash: media.accessHash });
        let offset = 0;
        for (;;) {
            const part = await client._files.run(
                "download",
                dcId,
                () => new Api.upload.GetWebFile({ location, offset, limit: WEB_FILE_PART }),
                args.signal
            );
            if (part.bytes.length) await target.write(offset, part.bytes);
            offset += part.bytes.length;
            await args.progressCallback?.(bigInt(offset), bigInt(part.size || media.size || offset));
            if (part.bytes.length < WEB_FILE_PART || (part.size && offset >= part.size)) break;
        }
        return await target.close();
    } catch (error) {
        await target.abort();
        throw error;
    }
}

function pickFileSize(sizes: Api.TypePhotoSize[], sizeType: string) {
    if (!sizeType || !sizes || !sizes.length) {
        return undefined;
    }
    const indexOfSize = sizeTypes.indexOf(sizeType);
    let size;
    for (let i = indexOfSize; i < sizeTypes.length; i++) {
        size = sizes.find((s) => s.type === sizeTypes[i]);
        if (size && !(size instanceof Api.PhotoPathSize)) {
            return size;
        }
    }
    return undefined;
}

/** @hidden */
function getThumb(
    thumbs: (Api.TypePhotoSize | Api.TypeVideoSize)[],
    thumb?: number | string | Api.TypePhotoSize | Api.VideoSize
) {
    function sortThumb(thumb: Api.TypePhotoSize | Api.TypeVideoSize) {
        if (thumb instanceof Api.PhotoStrippedSize) {
            return thumb.bytes.length;
        }
        if (thumb instanceof Api.PhotoCachedSize) {
            return thumb.bytes.length;
        }
        if (thumb instanceof Api.PhotoSize) {
            return thumb.size;
        }
        if (thumb instanceof Api.PhotoSizeProgressive) {
            return Math.max(...thumb.sizes);
        }
        if (thumb instanceof Api.VideoSize) {
            return thumb.size;
        }
        return 0;
    }

    thumbs = thumbs.sort((a, b) => sortThumb(a) - sortThumb(b));
    const correctThumbs = [];
    for (const t of thumbs) {
        if (!(t instanceof Api.PhotoPathSize)) {
            correctThumbs.push(t);
        }
    }
    if (thumb == undefined) {
        return correctThumbs.pop();
    } else if (typeof thumb == "number") {
        return correctThumbs[thumb];
    } else if (typeof thumb == "string") {
        for (const t of correctThumbs) {
            if ("type" in t && t.type == thumb) {
                return t;
            }
        }
    } else if (
        thumb instanceof Api.PhotoSize ||
        thumb instanceof Api.PhotoCachedSize ||
        thumb instanceof Api.PhotoStrippedSize ||
        thumb instanceof Api.VideoSize
    ) {
        return thumb;
    }
}

/** @hidden */
export async function _downloadCachedPhotoSize(
    size: Api.PhotoCachedSize | Api.PhotoStrippedSize,
    outputFile?: OutFile
): Promise<string | Buffer | undefined> {
    let data: Buffer;
    if (size instanceof Api.PhotoStrippedSize) {
        data = strippedPhotoToJpg(size.bytes);
    } else {
        data = size.bytes;
    }
    const target = await openTarget(outputFile, data.length);
    try {
        await target.write(0, data);
        return await target.close();
    } catch (err) {
        await target.abort();
        throw err;
    }
}

function getProperFilename(
    file: OutFile | undefined,
    fileType: string,
    extension: string,
    date: number
) {
    if (!file || typeof file != "string") {
        return file;
    }

    if (fs.existsSync(file) && fs.lstatSync(file).isDirectory()) {
        let fullName = fileType + date + extension;
        return path.join(file, fullName);
    }
    return file;
}

/** @hidden */
export async function _downloadPhoto(
    client: TelegramClient,
    photo: Api.MessageMediaPhoto | Api.Photo,
    file?: OutFile,
    date?: number,
    thumb?: number | string | Api.TypePhotoSize,
    progressCallback?: progressCallback,
    extra?: DownloadCancelParams
): Promise<Buffer | string | undefined> {
    if (photo instanceof Api.MessageMediaPhoto) {
        if (photo.photo instanceof Api.PhotoEmpty || !photo.photo) {
            return Buffer.alloc(0);
        }
        photo = photo.photo;
    }
    if (!(photo instanceof Api.Photo)) {
        return Buffer.alloc(0);
    }
    const photoSizes = [...(photo.sizes || []), ...(photo.videoSizes || [])];
    const size = getThumb(photoSizes, thumb);
    if (!size || size instanceof Api.PhotoSizeEmpty) {
        return Buffer.alloc(0);
    }
    if (!date) {
        date = Date.now();
    }

    file = getProperFilename(file, "photo", ".jpg", date);
    if (
        size instanceof Api.PhotoCachedSize ||
        size instanceof Api.PhotoStrippedSize
    ) {
        return _downloadCachedPhotoSize(size, file);
    }
    let fileSize: number;
    if (size instanceof Api.PhotoSizeProgressive) {
        fileSize = Math.max(...size.sizes);
    } else {
        fileSize = "size" in size ? size.size : 512;
    }

    return downloadFile(
        client,
        new Api.InputPhotoFileLocation({
            id: photo.id,
            accessHash: photo.accessHash,
            fileReference: photo.fileReference,
            thumbSize: "type" in size ? size.type : "",
        }),
        {
            outputFile: file,
            fileSize: bigInt(fileSize),
            progressCallback: progressCallback,
            dcId: photo.dcId,
            signal: extra?.signal,
            requestTimeout: extra?.requestTimeout,
        }
    );
}

/** @hidden */
export async function downloadProfilePhoto(
    client: TelegramClient,
    entity: EntityLike,
    fileParams: DownloadProfilePhotoParams
): Promise<string | Buffer | undefined> {
    let photo;
    if (typeof entity == "object" && "photo" in entity) {
        photo = entity.photo;
    } else {
        entity = await client.getEntity(entity);
        if ("photo" in entity) {
            photo = entity.photo;
        } else {
            throw new Error(
                `Could not get photo from ${
                    entity ? entity.className : undefined
                }`
            );
        }
    }
    let dcId;
    let loc;
    if (
        photo instanceof Api.UserProfilePhoto ||
        photo instanceof Api.ChatPhoto
    ) {
        dcId = photo.dcId;
        loc = new Api.InputPeerPhotoFileLocation({
            peer: utils.getInputPeer(entity),
            photoId: photo.photoId,
            big: fileParams.isBig,
        });
    } else {
        return Buffer.alloc(0);
    }
    return client.downloadFile(loc, {
        outputFile: fileParams.outputFile,
        dcId,
        signal: fileParams.signal,
        requestTimeout: fileParams.requestTimeout,
    });
}

/** Parameters for {@link TelegramClient.iterDownload}. */
export interface IterDownloadParams extends DownloadCancelParams {
    /** Byte offset to start downloading from. Must be divisible by 4096 unless `precise` handles it (it does by default). */
    offset?: bigInt.BigInteger | number;
    /** Stop after this many bytes (approximate — rounded up to whole chunks). */
    limit?: number;
    /** Size of each downloaded chunk in bytes. Must be divisible by 4096; server caps at 1 MB. Defaults to 512 KB. */
    requestSize?: number;
    /** The DC to download from. Auto-corrected on FILE_MIGRATE. */
    dcId?: number;
}

/**
 * Iterates over a file's contents chunk by chunk — streaming download
 * without buffering the whole file in memory.
 * @hidden
 */
export async function* iterDownload(
    client: TelegramClient,
    file:
        | Api.Message
        | Api.MessageMediaDocument
        | Api.MessageMediaPhoto
        | Api.TypeInputFileLocation,
    params: IterDownloadParams = {}
): AsyncGenerator<Buffer, void, unknown> {
    const info = utils.getFileInfo(file);
    const requestSize = params.requestSize ?? 512 * 1024;
    if (requestSize % MIN_CHUNK_SIZE !== 0) throw new Error("requestSize must be divisible by 4096");
    const offset = typeof params.offset === "number" ? params.offset : params.offset?.toJSNumber() ?? 0;
    const aligned = ONE_MB % requestSize === 0;
    const origin = aligned ? offset - (offset % requestSize) : offset;
    let skip = offset - origin;
    const abort = new AbortController();
    const forward = () => abort.abort();
    if (params.signal?.aborted) abort.abort();
    else params.signal?.addEventListener("abort", forward, { once: true });
    const ready = new Map<number, Buffer>();
    let wake: (() => void) | undefined;
    const notify = () => {
        const resolve = wake;
        wake = undefined;
        resolve?.();
    };
    let next = origin;
    const dc = params.dcId ?? info.dcId ?? client.session.dcId;
    const release = await client._files.acquireDownload(dc, info.size?.toJSNumber(), abort.signal);
    const downloader = new FileDownloader(client._files, {
        location: info.location as Api.TypeInputFileLocation,
        dcId: dc,
        kind: "download",
        partSize: requestSize,
        offset: origin,
        limit: params.limit !== undefined ? params.limit + skip : undefined,
        precise: !aligned,
        signal: abort.signal,
        sink: {
            write(partOffset, data) {
                ready.set(partOffset, data);
                notify();
            },
        },
    });
    downloader.setAheadLimit(offset + Math.max(ITER_AHEAD_BYTES, 4 * requestSize));
    let finished = false;
    let failure: unknown;
    downloader.run().then(
        () => (finished = true),
        (error) => (failure = error)
    ).finally(notify);
    try {
        for (;;) {
            const chunk = ready.get(next);
            if (chunk) {
                ready.delete(next);
                next += chunk.length;
                downloader.setAheadLimit(next + Math.max(ITER_AHEAD_BYTES, 4 * requestSize));
                const out = skip ? chunk.subarray(skip) : chunk;
                skip = 0;
                if (out.length) yield out;
                continue;
            }
            if (failure) throw failure instanceof MediaAbortError ? new MediaAbortError() : failure;
            if (finished) return;
            await new Promise<void>((resolve) => (wake = resolve));
        }
    } finally {
        release();
        abort.abort();
        params.signal?.removeEventListener("abort", forward);
    }
}
