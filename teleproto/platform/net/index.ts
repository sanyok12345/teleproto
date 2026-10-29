import type * as browser from "./browser";
import type { Implements } from "../implements";
import * as platform from "#platform/net";
import type * as node from "./node";
import type { Network, TcpSocket } from "./types";

export type * from "./types";
export type Socket = node.Socket;

const implementation: Network<Socket> = platform;

export type BrowserImplementation = Implements<Network<TcpSocket>, typeof browser>;

export const { tcp, createSocket, isIP, httpConnect, socksConnect } = implementation;
