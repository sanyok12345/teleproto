import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessage } from "../TypeMessage";
import { TypeUpdate } from "../TypeUpdate";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class ChannelDifference extends TLObject {
    static CONSTRUCTOR_ID = 543450958;
    static SUBCLASS_OF_ID = 696872797;
    static className = "updates.ChannelDifference";
    static classType = "constructor";

    flags!: number;
    final?: boolean;
    pts!: number;
    timeout?: number;
    newMessages!: TypeMessage[];
    otherUpdates!: TypeUpdate[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, final?: boolean, pts?: number, timeout?: number, newMessages?: TypeMessage[], otherUpdates?: TypeUpdate[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.final = args.final;
        this.pts = args.pts!;
        this.timeout = args.timeout;
        this.newMessages = args.newMessages!;
        this.otherUpdates = args.otherUpdates!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(543450958, false);
        let flags = 0;
        if (this.final) { flags |= 1 << 0; }
        if (this.timeout !== undefined && this.timeout !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.final !== undefined && this.final !== null) {
        }
        writer.writeInt(this.pts);
        if (this.timeout !== undefined && this.timeout !== null) {
            writer.writeInt(this.timeout);
        }
        writer.writeVector(this.newMessages, (item) => {
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
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelDifference {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _final = true;
            args.final = _final;
        } else {
            args.final = false;
        }
        const _pts = reader.readInt();
        args.pts = _pts;
        if (args.flags & (1 << 1)) {
            const _timeout = reader.readInt();
            args.timeout = _timeout;
        } else {
            args.timeout = undefined;
        }
        const _newMessages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.newMessages = _newMessages;
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
        return new ChannelDifference(args);
    }
}