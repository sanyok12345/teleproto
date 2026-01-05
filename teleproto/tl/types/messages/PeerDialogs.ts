import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDialog } from "../TypeDialog";
import { TypeMessage } from "../TypeMessage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";
import { TypeState } from "../updates/TypeState";

export class PeerDialogs extends TLObject {
    static CONSTRUCTOR_ID = 863093588;
    static SUBCLASS_OF_ID = 986120498;
    static className = "messages.PeerDialogs";
    static classType = "constructor";

    dialogs!: TypeDialog[];
    messages!: TypeMessage[];
    chats!: TypeChat[];
    users!: TypeUser[];
    state!: TypeState;

    constructor(args: { dialogs?: TypeDialog[], messages?: TypeMessage[], chats?: TypeChat[], users?: TypeUser[], state?: TypeState } = {}) {
        super();
        this.dialogs = args.dialogs!;
        this.messages = args.messages!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.state = args.state!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(863093588, false);
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
        writer.write(this.state.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerDialogs {
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
        const _state = reader.tgReadObject();
        args.state = _state;
        return new PeerDialogs(args);
    }
}