import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDialog } from "../TypeDialog";
import { TypeMessage } from "../TypeMessage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class Dialogs extends TLObject {
    static CONSTRUCTOR_ID = 364538944;
    static SUBCLASS_OF_ID = 236671726;
    static className = "messages.Dialogs";
    static classType = "constructor";

    dialogs!: TypeDialog[];
    messages!: TypeMessage[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { dialogs?: TypeDialog[], messages?: TypeMessage[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.dialogs = args.dialogs!;
        this.messages = args.messages!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(364538944, false);
        writer.writeVector(this.dialogs, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.messages, (item) => {
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

    static fromReader(reader: BinaryReader): Dialogs {
        const args: any = {};
        const _dialogs = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.dialogs = _dialogs;
        const _messages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.messages = _messages;
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
        return new Dialogs(args);
    }
}