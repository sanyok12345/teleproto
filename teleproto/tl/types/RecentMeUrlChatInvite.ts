import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatInvite } from "./TypeChatInvite";

export class RecentMeUrlChatInvite extends TLObject {
    static CONSTRUCTOR_ID = 3947431965;
    static SUBCLASS_OF_ID = 1436889209;
    static className = "RecentMeUrlChatInvite";
    static classType = "constructor";

    url!: string;
    chatInvite!: TypeChatInvite;

    constructor(args: { url?: string, chatInvite?: TypeChatInvite } = {}) {
        super();
        this.url = args.url!;
        this.chatInvite = args.chatInvite!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3947431965, false);
        writer.tgWriteString(this.url);
        writer.write(this.chatInvite.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentMeUrlChatInvite {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _chatInvite = reader.tgReadObject();
        args.chatInvite = _chatInvite;
        return new RecentMeUrlChatInvite(args);
    }
}