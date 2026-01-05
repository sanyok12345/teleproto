import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";

export class HideChatlistUpdates extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1726252795;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "chatlists.HideChatlistUpdates";
    static classType = "request";

    chatlist!: TypeInputChatlist;

    constructor(args: { chatlist?: TypeInputChatlist } = {}) {
        super();
        this.chatlist = args.chatlist!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1726252795, false);
        writer.write(this.chatlist.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): HideChatlistUpdates {
        const args: any = {};
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        return new HideChatlistUpdates(args);
    }
}