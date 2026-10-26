import * as node from "./node";
import type { FileSystem } from "./types";

export type * from "./types";

const implementation: FileSystem = node;

export const { open, readFile, size, isFile, isDirectory, exists, isFileStream, resolve, join, basename, isAbsolute } = implementation;
