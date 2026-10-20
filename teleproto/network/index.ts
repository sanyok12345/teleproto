export { Session, Session as MTProtoSender } from "./session/Session";
export type {
    SessionOptions,
    SenderLifecycle,
    SenderTempBinding,
    ConnectionBreakReason,
    LifecycleEvent,
} from "./session/Session";
export { SessionLink } from "./session/SessionLink";
export type { LinkClose, LinkCloseReason } from "./session/SessionLink";
export { ConnectThrottle } from "./session/ConnectThrottle";
export { UpdateConnectionState } from "./session/UpdateConnectionState";

export { PlainSender, PlainSender as MTProtoPlainSender } from "./mtproto/PlainSender";
export { doAuthentication } from "./mtproto/authKeyExchange";
export { SessionState } from "./mtproto/SessionState";
export { RequestState } from "./mtproto/RequestState";

export {
    Connection,
    ConnectionTCPFull,
    ConnectionTCPAbridged,
    ConnectionTCPIntermediate,
    ConnectionTCPPaddedIntermediate,
    ConnectionTCPObfuscated,
} from "./connection";

export {
    Transport,
    TcpTransport,
    SocksTransport,
    HttpProxyTransport,
    MTProxyTransport,
    WebSocketTransport,
    WebProxyTransport,
} from "./transport";
export type {
    SocksTransportOptions,
    HttpProxyTransportOptions,
    MTProxyTransportOptions,
} from "./transport";
export { NetSocket } from "./transport/socket/NetSocket";
export { WebSocketSocket } from "./transport/socket/WebSocketSocket";
export type { SocketInterface, SocketFactory, PacketReader } from "./transport/socket/types";

export { SessionSlot, SessionSlot as SenderSlot, SlotRemovedError } from "./dc/SessionSlot";
export type { SenderSlotState, SenderSlotDeathReason, SenderSlotOptions } from "./dc/SessionSlot";
export { SessionPool, SessionPool as Network } from "./dc/SessionPool";
export type { NetworkOptions, SessionLease } from "./dc/SessionPool";
export { DcState, DcState as Dcenter, DcStateRegistry, DcStateRegistry as DcenterRegistry } from "./dc/DcState";
export { DcAddressBook } from "./dc/DcAddressBook";
export type { DcAddress } from "./dc/DcAddressBook";
export * from "./dc/dcId";

export { MediaAbortError, CdnRedirectError } from "../errors/FileErrors";
