import type { Buffer } from "../buffer";
import type { FileHandle, FileStream } from "./types";

export { basename, isAbsolute, join, resolve } from "./path";

function unavailable(): Error {
    return new Error("File system paths are not available in this environment: pass a Buffer, a Blob or a CustomFile with a buffer");
}

export function open(_path: string, _flags: "r" | "w"): Promise<FileHandle> {
    return Promise.reject(unavailable());
}

export function readFile(_path: string): Promise<Buffer> {
    return Promise.reject(unavailable());
}

export function size(_path: string): Promise<number> {
    return Promise.reject(unavailable());
}

export function isFile(_path: string): Promise<boolean> {
    return Promise.reject(unavailable());
}

export function isDirectory(_path: string): boolean {
    return false;
}

export function exists(_path: string): boolean {
    return false;
}

export function isFileStream(_value: unknown): _value is FileStream {
    return false;
}
