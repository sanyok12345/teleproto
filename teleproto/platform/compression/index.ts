import * as node from "./node";
import type { Compression } from "./types";

export type * from "./types";

const implementation: Compression = node;

export const { gzip, gunzip, crc32 } = implementation;
