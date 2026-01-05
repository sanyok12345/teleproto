import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeUpdates } from "../../types/TypeUpdates";

export class GetGroupCallChainBlocks extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4003432614;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.GetGroupCallChainBlocks";
    static classType = "request";

    call!: TypeInputGroupCall;
    subChainId!: number;
    offset!: number;
    limit!: number;

    constructor(args: { call?: TypeInputGroupCall, subChainId?: number, offset?: number, limit?: number } = {}) {
        super();
        this.call = args.call!;
        this.subChainId = args.subChainId!;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4003432614, false);
        writer.write(this.call.getBytes());
        writer.writeInt(this.subChainId);
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGroupCallChainBlocks {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _subChainId = reader.readInt();
        args.subChainId = _subChainId;
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetGroupCallChainBlocks(args);
    }
}