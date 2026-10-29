import type bigInt from "big-integer";
import { Api } from "../../tl";
import { Buffer } from "../../platform";

export interface UploadSource {
    read(offset: number, length: number): Promise<Buffer>;
    close(): Promise<void>;
}

export interface UploadedFile {
    fileId: bigInt.BigInteger;
    size: number;
    partSize: number;
    partCount: number;
    isBig: boolean;
    dcId: number;
    open(): Promise<UploadSource>;
}

const uploaded = new WeakMap<object, UploadedFile>();

export function rememberUpload(input: Api.InputFile | Api.InputFileBig, file: UploadedFile) {
    uploaded.set(input, file);
}

export function findUploads(request: unknown): UploadedFile[] {
    const found = new Set<UploadedFile>();
    const seen = new Set<unknown>();
    const visit = (value: unknown, depth: number) => {
        if (!value || typeof value !== "object" || depth > 8 || seen.has(value) || Buffer.isBuffer(value)) return;
        seen.add(value);
        const known = uploaded.get(value);
        if (known) {
            found.add(known);
            return;
        }
        for (const child of Array.isArray(value) ? value : Object.values(value)) visit(child, depth + 1);
    };
    visit(request, 0);
    return [...found];
}
