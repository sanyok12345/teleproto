import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as node from "./node";
import type { System } from "./types";

export type * from "./types";

const implementation: System = node;

export type BrowserImplementation = Implements<System, typeof browser>;

export const { deviceModel, systemVersion } = implementation;
