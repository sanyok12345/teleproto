import { Buffer as RuntimeBuffer } from "buffer";

export const Buffer = RuntimeBuffer as unknown as BufferConstructor;
export type Buffer = globalThis.Buffer;
