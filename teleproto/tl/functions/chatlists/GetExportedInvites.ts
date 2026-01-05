import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";
import { TypeExportedInvites } from "../../types/chatlists/TypeExportedInvites";

export class GetExportedInvites extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3456359043;
    static SUBCLASS_OF_ID = 3871476160;
    static className = "chatlists.GetExportedInvites";
    static classType = "request";

    chatlist!: TypeInputChatlist;

    constructor(args: { chatlist?: TypeInputChatlist } = {}) {
        super();
        this.chatlist = args.chatlist!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3456359043, false);
        writer.write(this.chatlist.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedInvites {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetExportedInvites {
        const args: any = {};
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        return new GetExportedInvites(args);
    }
}