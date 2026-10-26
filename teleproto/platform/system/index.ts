import * as node from "./node";
import type { System } from "./types";

export type * from "./types";

const implementation: System = node;

export const { deviceModel, systemVersion } = implementation;
