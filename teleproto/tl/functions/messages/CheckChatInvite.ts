import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChatInvite } from "../../types/TypeChatInvite";

export class CheckChatInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1051570619;
    static SUBCLASS_OF_ID = 72750902;
    static className = "messages.CheckChatInvite";
    static classType = "request";

    hash?: string;

    constructor(args: { hash?: string } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1051570619, false);
        writer.tgWriteString(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckChatInvite {
        const args: any = {};
        const _hash = reader.tgReadString();
        args.hash = _hash;
        return new CheckChatInvite(args);
    }
}