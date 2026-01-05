import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeWebPage } from "../TypeWebPage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class WebPage extends TLObject {
    static CONSTRUCTOR_ID = 4250800829;
    static SUBCLASS_OF_ID = 754495828;
    static className = "messages.WebPage";
    static classType = "constructor";

    webpage!: TypeWebPage;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { webpage?: TypeWebPage, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.webpage = args.webpage!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4250800829, false);
        writer.write(this.webpage.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPage {
        const args: any = {};
        const _webpage = reader.tgReadObject();
        args.webpage = _webpage;
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
        return new WebPage(args);
    }
}