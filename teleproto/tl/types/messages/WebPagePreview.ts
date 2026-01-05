import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessageMedia } from "../TypeMessageMedia";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class WebPagePreview extends TLObject {
    static CONSTRUCTOR_ID = 2358937772;
    static SUBCLASS_OF_ID = 3801354434;
    static className = "messages.WebPagePreview";
    static classType = "constructor";

    media!: TypeMessageMedia;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { media?: TypeMessageMedia, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.media = args.media!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2358937772, false);
        writer.write(this.media.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPagePreview {
        const args: any = {};
        const _media = reader.tgReadObject();
        args.media = _media;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new WebPagePreview(args);
    }
}