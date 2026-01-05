import { RpcAnswerUnknown } from "./RpcAnswerUnknown";
import { RpcAnswerDroppedRunning } from "./RpcAnswerDroppedRunning";
import { RpcAnswerDropped } from "./RpcAnswerDropped";

export type TypeRpcDropAnswer = RpcAnswerUnknown | RpcAnswerDroppedRunning | RpcAnswerDropped;