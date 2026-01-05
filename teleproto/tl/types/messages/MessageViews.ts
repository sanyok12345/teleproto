import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessageViews } from "../TypeMessageViews";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class MessageViews extends TLObject {
    static CONSTRUCTOR_ID = 3066361155;
    static SUBCLASS_OF_ID = 2947935132;
    static className = "messages.MessageViews";
    static classType = "constructor";

    views!: TypeMessageViews[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { views?: TypeMessageViews[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.views = args.views!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3066361155, false);
        writer.writeVector(this.views, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageViews {
        const args: any = {};
        const _views = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.views = _views;
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
        return new MessageViews(args);
    }
}