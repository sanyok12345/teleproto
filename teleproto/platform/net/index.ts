import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as node from "./node";
import type { Network, TcpSocket } from "./types";

export type * from "./types";
export type Socket = node.Socket;

const implementation: Network<Socket> = node;

export type BrowserImplementation = Implements<Network<TcpSocket>, typeof browser>;

export const { tcp, createSocket, isIP, httpConnect, socksConnect } = implementation;
