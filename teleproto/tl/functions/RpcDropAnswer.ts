import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeRpcDropAnswer } from "../types/TypeRpcDropAnswer";

export class RpcDropAnswer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1491380032;
    static SUBCLASS_OF_ID = 1271559536;
    static className = "RpcDropAnswer";
    static classType = "request";

    reqMsgId!: bigint;

    constructor(args: { reqMsgId?: bigint } = {}) {
        super();
        this.reqMsgId = args.reqMsgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1491380032, false);
        writer.writeLargeInt(this.reqMsgId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeRpcDropAnswer {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RpcDropAnswer {
        const args: any = {};
        const _reqMsgId = reader.readLargeInt(64);
        args.reqMsgId = _reqMsgId;
        return new RpcDropAnswer(args);
    }
}