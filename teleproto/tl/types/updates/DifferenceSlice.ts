import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessage } from "../TypeMessage";
import { TypeEncryptedMessage } from "../TypeEncryptedMessage";
import { TypeUpdate } from "../TypeUpdate";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";
import { TypeState } from "../updates/TypeState";

export class DifferenceSlice extends TLObject {
    static CONSTRUCTOR_ID = 2835028353;
    static SUBCLASS_OF_ID = 541599860;
    static className = "updates.DifferenceSlice";
    static classType = "constructor";

    newMessages!: TypeMessage[];
    newEncryptedMessages!: TypeEncryptedMessage[];
    otherUpdates!: TypeUpdate[];
    chats!: TypeChat[];
    users!: TypeUser[];
    intermediateState!: TypeState;

    constructor(args: { newMessages?: TypeMessage[], newEncryptedMessages?: TypeEncryptedMessage[], otherUpdates?: TypeUpdate[], chats?: TypeChat[], users?: TypeUser[], intermediateState?: TypeState } = {}) {
        super();
        this.newMessages = args.newMessages!;
        this.newEncryptedMessages = args.newEncryptedMessages!;
        this.otherUpdates = args.otherUpdates!;
        this.chats = args.chats!;
        this.users = args.users!;
        this.intermediateState = args.intermediateState!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2835028353, false);
        writer.writeVector(this.newMessages, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.newEncryptedMessages, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.otherUpdates, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        writer.write(this.intermediateState.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DifferenceSlice {
        const args: any = {};
        const _newMessages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.newMessages = _newMessages;
        const _newEncryptedMessages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.newEncryptedMessages = _newEncryptedMessages;
        const _otherUpdates = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.otherUpdates = _otherUpdates;
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
        const _intermediateState = reader.tgReadObject();
        args.intermediateState = _intermediateState;
        return new DifferenceSlice(args);
    }
}