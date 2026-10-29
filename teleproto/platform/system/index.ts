import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as platform from "#platform/system";
import type { System } from "./types";

export type * from "./types";

const implementation: System = platform;

export type BrowserImplementation = Implements<System, typeof browser>;

export const { deviceModel, systemVersion } = implementation;
