import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeMessageEditData } from "../../types/messages/TypeMessageEditData";

export class GetMessageEditData extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4255550774;
    static SUBCLASS_OF_ID = 4215772317;
    static className = "messages.GetMessageEditData";
    static classType = "request";

    peer?: EntityLike;
    id?: number;

    constructor(args: { peer?: EntityLike, id?: number } = {}) {
        super();
        this.peer = args.peer;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4255550774, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessageEditData {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMessageEditData {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _id = reader.readInt();
        args.id = _id;
        return new GetMessageEditData(args);
    }
}