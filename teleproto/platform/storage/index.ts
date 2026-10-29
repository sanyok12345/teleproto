import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as platform from "#platform/storage";
import type { KeyValueStorage } from "./types";

export type * from "./types";

const implementation: KeyValueStorage = platform;

export type BrowserImplementation = Implements<KeyValueStorage, typeof browser>;

export const { open } = implementation;
