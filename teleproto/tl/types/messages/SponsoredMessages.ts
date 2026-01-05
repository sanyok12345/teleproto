import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSponsoredMessage } from "../TypeSponsoredMessage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class SponsoredMessages extends TLObject {
    static CONSTRUCTOR_ID = 4292502893;
    static SUBCLASS_OF_ID = 2134993376;
    static className = "messages.SponsoredMessages";
    static classType = "constructor";

    flags!: number;
    postsBetween?: number;
    startDelay?: number;
    betweenDelay?: number;
    messages!: TypeSponsoredMessage[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, postsBetween?: number, startDelay?: number, betweenDelay?: number, messages?: TypeSponsoredMessage[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.postsBetween = args.postsBetween;
        this.startDelay = args.startDelay;
        this.betweenDelay = args.betweenDelay;
        this.messages = args.messages!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4292502893, false);
        let flags = 0;
        if (this.postsBetween !== undefined && this.postsBetween !== null) { flags |= 1 << 0; }
        if (this.startDelay !== undefined && this.startDelay !== null) { flags |= 1 << 1; }
        if (this.betweenDelay !== undefined && this.betweenDelay !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.postsBetween !== undefined && this.postsBetween !== null) {
            writer.writeInt(this.postsBetween);
        }
        if (this.startDelay !== undefined && this.startDelay !== null) {
            writer.writeInt(this.startDelay);
        }
        if (this.betweenDelay !== undefined && this.betweenDelay !== null) {
            writer.writeInt(this.betweenDelay);
        }
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

    static fromReader(reader: BinaryReader): SponsoredMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _postsBetween = reader.readInt();
            args.postsBetween = _postsBetween;
        } else {
            args.postsBetween = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _startDelay = reader.readInt();
            args.startDelay = _startDelay;
        } else {
            args.startDelay = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _betweenDelay = reader.readInt();
            args.betweenDelay = _betweenDelay;
        } else {
            args.betweenDelay = undefined;
        }
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
        return new SponsoredMessages(args);
    }
}