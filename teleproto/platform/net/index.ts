import * as node from "./node";
import type { Network } from "./types";

export type * from "./types";
export type Socket = node.Socket;

const implementation: Network<Socket> = node;

export const { createSocket, isIP, httpConnect, socksConnect } = implementation;
