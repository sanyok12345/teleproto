import type { DateLike } from "../../define";
import { Writer } from "./Writer";
import { Buffer } from "../../platform";

export function serializeBytes(data: Buffer | string): Buffer {
    if (typeof data !== "string" && !Buffer.isBuffer(data)) throw new Error(`Bytes or str expected, not ${typeof data}`);
    const writer = new Writer();
    writer.bytes(data);
    return writer.finish();
}

export function serializeDate(dt: DateLike | Date | undefined | null): Buffer {
    const buffer = Buffer.alloc(4);
    if (!dt) return buffer;
    if (dt instanceof Date) dt = Math.floor((Date.now() - dt.getTime()) / 1000);
    if (typeof dt !== "number") throw new Error(`Cannot interpret "${String(dt)}" as a date`);
    buffer.writeInt32LE(dt, 0);
    return buffer;
}
