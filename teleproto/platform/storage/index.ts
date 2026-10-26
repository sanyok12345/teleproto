import * as node from "./node";
import type { KeyValueStorage } from "./types";

export type * from "./types";

const implementation: KeyValueStorage = node;

export const { open } = implementation;
