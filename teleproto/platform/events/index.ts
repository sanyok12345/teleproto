import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as node from "./node";
import type { Events } from "./types";

export type * from "./types";

const implementation: Events = node;

export type BrowserImplementation = Implements<Events, typeof browser>;

export const { setMaxListeners } = implementation;
