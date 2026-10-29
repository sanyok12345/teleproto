import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as platform from "#platform/events";
import type { Events } from "./types";

export type * from "./types";

const implementation: Events = platform;

export type BrowserImplementation = Implements<Events, typeof browser>;

export const { setMaxListeners } = implementation;
