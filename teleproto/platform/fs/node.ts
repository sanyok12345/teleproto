import nodeFs from "node:fs";
import nodePath from "node:path";
import type { FileHandle, FileStream } from "./types";
import { Buffer } from "../buffer";

export function open(path: string, flags: "r" | "w"): Promise<FileHandle> {
    return nodeFs.promises.open(path, flags);
}

export function readFile(path: string): Promise<Buffer> {
    return nodeFs.promises.readFile(path);
}

export async function size(path: string): Promise<number> {
    return (await nodeFs.promises.stat(path)).size;
}

export async function isFile(path: string): Promise<boolean> {
    return (await nodeFs.promises.lstat(path)).isFile();
}

export function isDirectory(path: string): boolean {
    return nodeFs.existsSync(path) && nodeFs.lstatSync(path).isDirectory();
}

export function exists(path: string): boolean {
    return nodeFs.existsSync(path);
}

export function isFileStream(value: unknown): value is FileStream {
    return value instanceof nodeFs.WriteStream;
}

export function resolve(...paths: string[]): string {
    return nodePath.resolve(...paths);
}

export function join(...paths: string[]): string {
    return nodePath.join(...paths);
}

export function basename(path: string): string {
    return nodePath.basename(path);
}

export function isAbsolute(path: string): boolean {
    return nodePath.isAbsolute(path);
}
