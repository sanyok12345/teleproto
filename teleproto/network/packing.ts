import { BinaryWriter, Logger } from "../extensions";
import { MessageContainer, TLMessage } from "../tl/core";
import { MTProtoState } from "./MTProtoState";
import { RequestState } from "./RequestState";

export interface PackedBatch {
    batch: RequestState[];
    data: Buffer;
}

export async function packRequestBatch(
    state: MTProtoState,
    queued: RequestState[],
    log: Logger
): Promise<PackedBatch | null> {
    let buffer = new BinaryWriter(Buffer.alloc(0));
    const batch: RequestState[] = [];
    let size = 0;

    while (
        queued.length &&
        batch.length < MessageContainer.MAXIMUM_LENGTH
    ) {
        const request = queued.shift()!;
        size += request.data.length + TLMessage.SIZE_OVERHEAD;
        if (size <= MessageContainer.MAXIMUM_SIZE) {
            request.msgId = await state.writeDataAsMessage(
                buffer,
                request.data,
                request.request.classType === "request",
                request.after?.msgId,
                request.forcedMsgId
            );
            log.debug(
                `Assigned msgId = ${request.msgId} to ${
                    request.request.className ||
                    request.request.constructor.name
                }`
            );
            batch.push(request);
            continue;
        }
        if (batch.length) {
            queued.unshift(request);
            break;
        }
        log.warn(
            `Message payload for ${
                request.request.className || request.request.constructor.name
            } is too long ${request.data.length} and cannot be sent`
        );
        request.reject(new Error("Request payload is too big"));
        size = 0;
    }
    if (!batch.length) {
        return null;
    }

    let data = buffer.getValue();
    if (batch.length > 1) {
        const header = Buffer.alloc(8);
        header.writeUInt32LE(MessageContainer.CONSTRUCTOR_ID, 0);
        header.writeInt32LE(batch.length, 4);
        const containerBody = Buffer.concat([header, data]);
        buffer = new BinaryWriter(Buffer.alloc(0));
        const containerId = await state.writeDataAsMessage(
            buffer,
            containerBody,
            false
        );
        for (const request of batch) {
            request.containerId = containerId;
        }
        data = buffer.getValue();
    }

    return { batch, data };
}
