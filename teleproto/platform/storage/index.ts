import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as node from "./node";
import type { KeyValueStorage } from "./types";

export type * from "./types";

const implementation: KeyValueStorage = node;

export type BrowserImplementation = Implements<KeyValueStorage, typeof browser>;

export const { open } = implementation;
