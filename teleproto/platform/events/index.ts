import * as node from "./node";
import type { Events } from "./types";

export type * from "./types";

const implementation: Events = node;

export const { setMaxListeners } = implementation;
