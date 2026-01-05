import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatAdminsWithInvites } from "../../types/messages/TypeChatAdminsWithInvites";

export class GetAdminsWithInvites extends MTProtoRequest {
    static CONSTRUCTOR_ID = 958457583;
    static SUBCLASS_OF_ID = 2405149995;
    static className = "messages.GetAdminsWithInvites";
    static classType = "request";

    peer?: EntityLike;

    constructor(args: { peer?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(958457583, false);
        writer.write((this.peer! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatAdminsWithInvites {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAdminsWithInvites {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new GetAdminsWithInvites(args);
    }
}