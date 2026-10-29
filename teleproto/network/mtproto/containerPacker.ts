import { Writer } from "../../tl/binary/Writer";
import { MessageContainer, TLMessage } from "../../tl/core";
import type { SessionState } from "./SessionState";
import { expectsAnswer, type OutgoingObject, type RequestState } from "./RequestState";
import { Buffer } from "../../platform";

const MAX_MESSAGES = 1000;
const MAX_CONTAINER_BYTES = 32 * 1024;

const SERVICE_REQUESTS = new Set([
    "Ping",
    "PingDelayDisconnect",
    "GetFutureSalts",
    "RpcDropAnswer",
    "DestroySession",
    "DestroyAuthKey",
]);

const SOLO_REQUESTS = new Set([
    "upload.GetFile",
    "upload.GetCdnFile",
    "upload.GetWebFile",
    "upload.SaveFilePart",
    "upload.SaveBigFilePart",
]);

export interface PackedMessages {
    batch: RequestState[];
    data: Buffer;
}

export function isContentRelated(request: OutgoingObject): boolean {
    return expectsAnswer(request) && !SERVICE_REQUESTS.has(request.className);
}

export async function packMessages(state: SessionState, queues: RequestState[][]): Promise<PackedMessages | undefined> {
    const writer = new Writer();
    const batch: RequestState[] = [];
    let size = 0;
    pack: for (const queue of queues) {
        while (queue.length && batch.length < MAX_MESSAGES) {
            const request = queue[0];
            if (request.cancelled) {
                queue.shift();
                continue;
            }
            const solo = SOLO_REQUESTS.has(request.request.className);
            const bytes = request.data.length + TLMessage.SIZE_OVERHEAD;
            if (batch.length && (solo || size + bytes > MAX_CONTAINER_BYTES)) break pack;
            queue.shift();
            if (bytes > MessageContainer.MAXIMUM_SIZE) {
                request.reject(new Error(`${request.request.className} payload of ${request.data.length} bytes is too big`));
                continue;
            }
            request.msgId = await state.writeDataAsMessage(
                writer,
                request.data,
                isContentRelated(request.request),
                request.after?.msgId,
                request.forcedMsgId,
                isContentRelated(request.request) && !solo
            );
            batch.push(request);
            size += bytes;
            if (solo) break pack;
        }
    }
    if (!batch.length) return undefined;
    if (batch.length === 1) return { batch, data: writer.finish() };

    const header = Buffer.allocUnsafe(8);
    header.writeUInt32LE(MessageContainer.CONSTRUCTOR_ID, 0);
    header.writeInt32LE(batch.length, 4);
    const container = new Writer();
    const containerId = await state.writeDataAsMessage(container, Buffer.concat([header, writer.finish()]), false);
    for (const request of batch) request.containerId = containerId;
    return { batch, data: container.finish() };
}
