import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageFwdHeader extends TLObject {
    static CONSTRUCTOR_ID = 1313731771;
    static SUBCLASS_OF_ID = 2049468420;
    static className = "MessageFwdHeader";
    static classType = "constructor";

    flags!: number;
    imported?: boolean;
    savedOut?: boolean;
    fromId?: TypePeer;
    fromName?: string;
    date!: number;
    channelPost?: number;
    postAuthor?: string;
    savedFromPeer?: TypePeer;
    savedFromMsgId?: number;
    savedFromId?: TypePeer;
    savedFromName?: string;
    savedDate?: number;
    psaType?: string;

    constructor(args: { flags?: number, imported?: boolean, savedOut?: boolean, fromId?: TypePeer, fromName?: string, date?: number, channelPost?: number, postAuthor?: string, savedFromPeer?: TypePeer, savedFromMsgId?: number, savedFromId?: TypePeer, savedFromName?: string, savedDate?: number, psaType?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.imported = args.imported;
        this.savedOut = args.savedOut;
        this.fromId = args.fromId;
        this.fromName = args.fromName;
        this.date = args.date!;
        this.channelPost = args.channelPost;
        this.postAuthor = args.postAuthor;
        this.savedFromPeer = args.savedFromPeer;
        this.savedFromMsgId = args.savedFromMsgId;
        this.savedFromId = args.savedFromId;
        this.savedFromName = args.savedFromName;
        this.savedDate = args.savedDate;
        this.psaType = args.psaType;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1313731771, false);
        let flags = 0;
        if (this.imported) { flags |= 1 << 7; }
        if (this.savedOut) { flags |= 1 << 11; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 0; }
        if (this.fromName !== undefined && this.fromName !== null) { flags |= 1 << 5; }
        if (this.channelPost !== undefined && this.channelPost !== null) { flags |= 1 << 2; }
        if (this.postAuthor !== undefined && this.postAuthor !== null) { flags |= 1 << 3; }
        if (this.savedFromPeer !== undefined && this.savedFromPeer !== null) { flags |= 1 << 4; }
        if (this.savedFromMsgId !== undefined && this.savedFromMsgId !== null) { flags |= 1 << 4; }
        if (this.savedFromId !== undefined && this.savedFromId !== null) { flags |= 1 << 8; }
        if (this.savedFromName !== undefined && this.savedFromName !== null) { flags |= 1 << 9; }
        if (this.savedDate !== undefined && this.savedDate !== null) { flags |= 1 << 10; }
        if (this.psaType !== undefined && this.psaType !== null) { flags |= 1 << 6; }
        writer.writeInt(flags, false);
        if (this.imported !== undefined && this.imported !== null) {
        }
        if (this.savedOut !== undefined && this.savedOut !== null) {
        }
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        if (this.fromName !== undefined && this.fromName !== null) {
            writer.tgWriteString(this.fromName);
        }
        writer.writeInt(this.date);
        if (this.channelPost !== undefined && this.channelPost !== null) {
            writer.writeInt(this.channelPost);
        }
        if (this.postAuthor !== undefined && this.postAuthor !== null) {
            writer.tgWriteString(this.postAuthor);
        }
        if (this.savedFromPeer !== undefined && this.savedFromPeer !== null) {
            writer.write(this.savedFromPeer.getBytes());
        }
        if (this.savedFromMsgId !== undefined && this.savedFromMsgId !== null) {
            writer.writeInt(this.savedFromMsgId);
        }
        if (this.savedFromId !== undefined && this.savedFromId !== null) {
            writer.write(this.savedFromId.getBytes());
        }
        if (this.savedFromName !== undefined && this.savedFromName !== null) {
            writer.tgWriteString(this.savedFromName);
        }
        if (this.savedDate !== undefined && this.savedDate !== null) {
            writer.writeInt(this.savedDate);
        }
        if (this.psaType !== undefined && this.psaType !== null) {
            writer.tgWriteString(this.psaType);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageFwdHeader {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 7)) {
            const _imported = true;
            args.imported = _imported;
        } else {
            args.imported = false;
        }
        if (args.flags & (1 << 11)) {
            const _savedOut = true;
            args.savedOut = _savedOut;
        } else {
            args.savedOut = false;
        }
        if (args.flags & (1 << 0)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _fromName = reader.tgReadString();
            args.fromName = _fromName;
        } else {
            args.fromName = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 2)) {
            const _channelPost = reader.readInt();
            args.channelPost = _channelPost;
        } else {
            args.channelPost = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _postAuthor = reader.tgReadString();
            args.postAuthor = _postAuthor;
        } else {
            args.postAuthor = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _savedFromPeer = reader.tgReadObject();
            args.savedFromPeer = _savedFromPeer;
        } else {
            args.savedFromPeer = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _savedFromMsgId = reader.readInt();
            args.savedFromMsgId = _savedFromMsgId;
        } else {
            args.savedFromMsgId = undefined;
        }
        if (args.flags & (1 << 8)) {
            const _savedFromId = reader.tgReadObject();
            args.savedFromId = _savedFromId;
        } else {
            args.savedFromId = undefined;
        }
        if (args.flags & (1 << 9)) {
            const _savedFromName = reader.tgReadString();
            args.savedFromName = _savedFromName;
        } else {
            args.savedFromName = undefined;
        }
        if (args.flags & (1 << 10)) {
            const _savedDate = reader.readInt();
            args.savedDate = _savedDate;
        } else {
            args.savedDate = undefined;
        }
        if (args.flags & (1 << 6)) {
            const _psaType = reader.tgReadString();
            args.psaType = _psaType;
        } else {
            args.psaType = undefined;
        }
        return new MessageFwdHeader(args);
    }
}