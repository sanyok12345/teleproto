import type { DateLike } from "../../define";

export function serializeBytes(data: Buffer | string): Buffer {
    if (!(data instanceof Buffer)) {
        if (typeof data === "string") {
            data = Buffer.from(data);
        } else {
            throw new Error(`Bytes or str expected, not ${typeof data}`);
        }
    }

    const chunks: Buffer[] = [];
    let padding: number;

    if (data.length < 254) {
        padding = (data.length + 1) % 4;
        if (padding !== 0) {
            padding = 4 - padding;
        }
        chunks.push(Buffer.from([data.length]));
        chunks.push(data);
    } else {
        padding = data.length % 4;
        if (padding !== 0) {
            padding = 4 - padding;
        }
        chunks.push(
            Buffer.from([
                254,
                data.length % 256,
                (data.length >> 8) % 256,
                (data.length >> 16) % 256,
            ])
        );
        chunks.push(data);
    }

    chunks.push(Buffer.alloc(padding).fill(0));
    return Buffer.concat(chunks);
}

export function serializeDate(dt: DateLike | Date | undefined | null): Buffer {
    if (!dt) {
        return Buffer.alloc(4).fill(0);
    }

    if (dt instanceof Date) {
        dt = Math.floor((Date.now() - dt.getTime()) / 1000);
    }

    if (typeof dt === "number") {
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(dt, 0);
        return buffer;
    }

    throw new Error(`Cannot interpret "${String(dt)}" as a date`);
}
