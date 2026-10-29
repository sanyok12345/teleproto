import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as node from "./node";
import type { FileSystem } from "./types";

export type * from "./types";

const implementation: FileSystem = node;

export type BrowserImplementation = Implements<FileSystem, typeof browser>;

export const { open, readFile, size, isFile, isDirectory, exists, isFileStream, resolve, join, basename, isAbsolute } = implementation;
