import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypeFactCheck } from "../../types/TypeFactCheck";

export class GetFactCheck extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3117270510;
    static SUBCLASS_OF_ID = 3148224531;
    static className = "messages.GetFactCheck";
    static classType = "request";

    peer?: EntityLike;
    msgId?: MessageIDLike[];

    constructor(args: { peer?: EntityLike, msgId?: MessageIDLike[] } = {}) {
        super();
        this.peer = args.peer;
        this.msgId = args.msgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3117270510, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.msgId!, (item) => {
            if (typeof item === 'number') {
                writer.writeInt(item);
            } else {
                writer.writeInt((item as any).id);
            }
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFactCheck[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFactCheck {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.msgId = _msgId;
        return new GetFactCheck(args);
    }
}