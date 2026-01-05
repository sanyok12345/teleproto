import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";
import { TypePeer } from "../../types/TypePeer";

export class GetLeaveChatlistSuggestions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4257011476;
    static SUBCLASS_OF_ID = 3113508222;
    static className = "chatlists.GetLeaveChatlistSuggestions";
    static classType = "request";

    chatlist!: TypeInputChatlist;

    constructor(args: { chatlist?: TypeInputChatlist } = {}) {
        super();
        this.chatlist = args.chatlist!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4257011476, false);
        writer.write(this.chatlist.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePeer[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetLeaveChatlistSuggestions {
        const args: any = {};
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        return new GetLeaveChatlistSuggestions(args);
    }
}