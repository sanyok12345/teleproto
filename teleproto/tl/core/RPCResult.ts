import type bigInt from "big-integer";
import type { Api } from "../api";
import type { Reader } from "../binary/Reader";
import { GZIPPacked } from "./GZIPPacked";

const RPC_ERROR_ID = 0x2144ca19;

export class RPCResult {
    static readonly CONSTRUCTOR_ID = 0xf35c6d01;
    static readonly classType = "constructor";
    readonly CONSTRUCTOR_ID = RPCResult.CONSTRUCTOR_ID;
    readonly classType = "constructor";

    constructor(
        readonly reqMsgId: bigInt.BigInteger,
        readonly body?: Buffer,
        readonly error?: Api.RpcError
    ) { }

    static fromReader(reader: Reader): RPCResult {
        const reqMsgId = reader.readLong();
        const inner = reader.readInt(false);
        if (inner === GZIPPacked.CONSTRUCTOR_ID) return new RPCResult(reqMsgId, GZIPPacked.fromReader(reader).data);
        reader.seek(-4);
        if (inner === RPC_ERROR_ID) return new RPCResult(reqMsgId, undefined, reader.tgReadObject() as Api.RpcError);
        return new RPCResult(reqMsgId, reader.read());
    }
}
