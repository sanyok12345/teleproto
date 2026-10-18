import { GZIPPacked } from "./GZIPPacked";
import { MessageContainer } from "./MessageContainer";
import { RPCResult } from "./RPCResult";
import type { Reader } from "../binary/Reader";

export { TLMessage } from "./TLMessage";
export { RPCResult, MessageContainer, GZIPPacked };

export const coreObjects = new Map<number, { fromReader(reader: Reader): unknown }>([
    [RPCResult.CONSTRUCTOR_ID, RPCResult],
    [GZIPPacked.CONSTRUCTOR_ID, GZIPPacked],
    [MessageContainer.CONSTRUCTOR_ID, MessageContainer],
]);
