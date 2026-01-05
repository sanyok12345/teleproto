import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeOutboxReadDate } from "../../types/TypeOutboxReadDate";

export class GetOutboxReadDate extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2353790557;
    static SUBCLASS_OF_ID = 1867613126;
    static className = "messages.GetOutboxReadDate";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike;

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2353790557, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeOutboxReadDate {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetOutboxReadDate {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new GetOutboxReadDate(args);
    }
}