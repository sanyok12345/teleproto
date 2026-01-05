import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";
import { TypeChatlistUpdates } from "../../types/chatlists/TypeChatlistUpdates";

export class GetChatlistUpdates extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2302776609;
    static SUBCLASS_OF_ID = 2098610666;
    static className = "chatlists.GetChatlistUpdates";
    static classType = "request";

    chatlist!: TypeInputChatlist;

    constructor(args: { chatlist?: TypeInputChatlist } = {}) {
        super();
        this.chatlist = args.chatlist!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2302776609, false);
        writer.write(this.chatlist.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatlistUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetChatlistUpdates {
        const args: any = {};
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        return new GetChatlistUpdates(args);
    }
}