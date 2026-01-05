import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeGroupCall } from "../../types/phone/TypeGroupCall";

export class GetGroupCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 68699611;
    static SUBCLASS_OF_ID = 809572030;
    static className = "phone.GetGroupCall";
    static classType = "request";

    call!: TypeInputGroupCall;
    limit!: number;

    constructor(args: { call?: TypeInputGroupCall, limit?: number } = {}) {
        super();
        this.call = args.call!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(68699611, false);
        writer.write(this.call.getBytes());
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeGroupCall {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetGroupCall {
        const args: any = {};
        const _call = reader.tgReadObject();
        args.call = _call;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetGroupCall(args);
    }
}