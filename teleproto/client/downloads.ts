import { Api } from "../tl";
import type { TelegramClient } from "./TelegramClient";
import { strippedPhotoToJpg } from "../Utils";
import { EntityLike, OutFile, ProgressCallback } from "../define";
import * as utils from "../Utils";
import { createWriteStream } from "fs";
import { BinaryWriter } from "../extensions";
import * as fs from "fs";
import path from "path";
import bigInt from "big-integer";
import {
    BoundedSemaphore,
    OrderedWriter,
} from "../network/OrderedWriter";
import { FilePoolAbortError } from "../network/FilePool";

export interface progressCallback {
    (
        downloaded: bigInt.BigInteger,
        fullSize: bigInt.BigInteger,
        ...args: any[]
    ): void;
    isCanceled?: boolean;
    acceptsBuffer?: boolean;
}

export interface DownloadFileParams {
    outputFile?: OutFile;
    dcId?: number;
    fileSize?: bigInt.BigInteger;
    partSizeKb?: number;
    progressCallback?: progressCallback;
    msgData?: [EntityLike, number];
}

export interface DownloadProfilePhotoParams {
    isBig?: boolean;
    outputFile?: OutFile;
}

const sizeTypes = ["w", "y", "d", "x", "c", "m", "b", "a", "s"];

const MIN_CHUNK_SIZE = 4096;
const ONE_MB = 1024 * 1024;

function getWriter(outputFile?: OutFile) {
    if (!outputFile || Buffer.isBuffer(outputFile)) {
        return new BinaryWriter(Buffer.alloc(0));
    } else if (typeof outputFile == "string") {
        return createWriteStream(outputFile);
    } else {
        return outputFile;
    }
}

async function closeWriter(
    writer: BinaryWriter | { write: Function; close?: Function; end?: Function },
) {
    if (writer instanceof fs.WriteStream) {
        await new Promise<void>((resolve, reject) => {
            const onErr = (err: any) => {
                writer.removeListener("close", onClose);
                reject(err);
            };
            const onClose = () => {
                writer.removeListener("error", onErr);
                resolve();
            };
            writer.once("close", onClose);
            writer.once("error", onErr);
            writer.end();
        });
        return;
    }
    if ("close" in writer && typeof writer.close === "function") {
        writer.close();
    }
}

function returnWriterValue(writer: any): Buffer | string | undefined {
    if (writer instanceof BinaryWriter) {
        return writer.getValue();
    }
    if (writer instanceof fs.WriteStream) {
        if (typeof writer.path == "string") {
            return path.resolve(writer.path);
        } else {
            return Buffer.from(writer.path);
        }
    }
}

function resolvePartSize(client: TelegramClient, partSizeKb?: number): number {
    let size = partSizeKb && partSizeKb > 0
        ? Math.floor(partSizeKb * 1024)
        : client._filePool.opts.partSize;
    if (size > ONE_MB) size = ONE_MB;
    if (size % MIN_CHUNK_SIZE !== 0) {
        throw new Error("partSizeKb must be a multiple of 4 (KB)");
    }
    return size;
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
    }: DownloadFileParams
): Promise<Buffer | string | undefined> {
    const info = utils.getFileInfo(inputLocation);
    const targetDc = dcId ?? info.dcId ?? client.session.dcId;
    const location = (info.location ?? inputLocation) as Api.TypeInputFileLocation;
    const totalSize: bigInt.BigInteger | undefined = fileSize ?? info.size;
    const totalBytes = totalSize ? totalSize.toJSNumber() : 0;
    const partSize = resolvePartSize(client, partSizeKb);

    const writer = getWriter(outputFile);
    const abort = new AbortController();
    let downloaded = 0;

    const reportProgress = async (bytes: number) => {
        downloaded += bytes;
        if (!progressCallback) return;
        if (progressCallback.isCanceled) {
            abort.abort();
            return;
        }
        await progressCallback(
            bigInt(downloaded),
            bigInt(totalBytes || downloaded),
        );
    };

    try {
        if (totalBytes <= 0) {
            await streamSequential(
                client,
                location,
                targetDc,
                partSize,
                writer,
                abort.signal,
                reportProgress,
            );
        } else {
            await streamParallel(
                client,
                location,
                targetDc,
                partSize,
                totalBytes,
                writer,
                abort.signal,
                reportProgress,
            );
        }
        await closeWriter(writer);
        return returnWriterValue(writer);
    } catch (err) {
        await closeWriter(writer).catch(() => {});
        throw err;
    }
}

async function streamSequential(
    client: TelegramClient,
    location: Api.TypeInputFileLocation,
    dcId: number,
    partSize: number,
    writer: any,
    signal: AbortSignal,
    onBytes: (n: number) => Promise<void>,
): Promise<void> {
    let idx = 0;
    while (true) {
        if (signal.aborted) return;
        const offset = bigInt(idx).multiply(partSize);
        const data = await client._filePool.getFile(
            dcId,
            location,
            offset,
            partSize,
            signal,
        );
        if (data.length > 0) {
            await writer.write(data);
            await onBytes(data.length);
        }
        if (data.length < partSize) return;
        idx++;
    }
}

async function streamParallel(
    client: TelegramClient,
    location: Api.TypeInputFileLocation,
    dcId: number,
    partSize: number,
    totalBytes: number,
    writer: any,
    signal: AbortSignal,
    onBytes: (n: number) => Promise<void>,
): Promise<void> {
    const totalParts = Math.max(1, Math.ceil(totalBytes / partSize));
    const ordered = new OrderedWriter(writer);
    const inflight = new BoundedSemaphore(
        Math.max(1, client._filePool.opts.inflightPerDc),
    );

    let firstError: any;
    const tasks: Promise<void>[] = [];

    for (let i = 0; i < totalParts; i++) {
        if (signal.aborted || firstError) break;
        await inflight.acquire();
        if (signal.aborted || firstError) {
            inflight.release();
            break;
        }
        const idx = i;
        const offset = bigInt(idx).multiply(partSize);
        tasks.push((async () => {
            try {
                const data = await client._filePool.getFile(
                    dcId,
                    location,
                    offset,
                    partSize,
                    signal,
                );
                if (!firstError) {
                    // Always push to the ordered writer, even if the part
                    // came back empty — otherwise `nextIdx` would stall on
                    // the gap and every later part would stay stuck in the
                    // stash, silently truncating the output.
                    await ordered.write(idx, data, onBytes);
                }
            } catch (err: any) {
                if (!firstError) firstError = err;
            } finally {
                // Holding the ticket until after the ordered write keeps the
                // stash naturally bounded by inflightPerDc parts. The disk
                // path is non-blocking (WriteStream.write is queued), so this
                // doesn't choke throughput.
                inflight.release();
            }
        })());
    }

    await Promise.all(tasks);
    if (firstError && !(firstError instanceof FilePoolAbortError)) {
        throw firstError;
    }
}

export interface DownloadMediaInterface {
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
    progressCallback?: ProgressCallback
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
            progressCallback
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
            msgData
        );
    } else if (media instanceof Api.MessageMediaContact) {
        return _downloadContact(client, media, {});
    } else if (
        media instanceof Api.WebDocument ||
        media instanceof Api.WebDocumentNoProxy
    ) {
        return _downloadWebDocument(client, media, {});
    } else {
        return Buffer.alloc(0);
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
    msgData?: [EntityLike, number]
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
            msgData: msgData,
        }
    );
}

/** @hidden */
export async function _downloadContact(
    _client: TelegramClient,
    _media: Api.MessageMediaContact,
    _args: DownloadMediaInterface
): Promise<Buffer> {
    throw new Error("not implemented");
}

/** @hidden */
export async function _downloadWebDocument(
    _client: TelegramClient,
    _media: Api.WebDocument | Api.WebDocumentNoProxy,
    _args: DownloadMediaInterface
): Promise<Buffer> {
    throw new Error("not implemented");
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
) {
    let data: Buffer;
    if (size instanceof Api.PhotoStrippedSize) {
        data = strippedPhotoToJpg(size.bytes);
    } else {
        data = size.bytes;
    }
    const writer = getWriter(outputFile);
    try {
        await writer.write(data);
        await closeWriter(writer);
    } catch (err) {
        await closeWriter(writer).catch(() => {});
        throw err;
    }
    return returnWriterValue(writer);
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
    progressCallback?: progressCallback
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
        }
    );
}

/** @hidden */
export async function downloadProfilePhoto(
    client: TelegramClient,
    entity: EntityLike,
    fileParams: DownloadProfilePhotoParams
) {
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
    });
}
