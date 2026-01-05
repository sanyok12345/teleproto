import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeReaction } from "./TypeReaction";

export class MessagePeerReaction extends TLObject {
    static CONSTRUCTOR_ID = 2356786748;
    static SUBCLASS_OF_ID = 2943591077;
    static className = "MessagePeerReaction";
    static classType = "constructor";

    flags!: number;
    big?: boolean;
    unread?: boolean;
    my?: boolean;
    peerId!: TypePeer;
    date!: number;
    reaction!: TypeReaction;

    constructor(args: { flags?: number, big?: boolean, unread?: boolean, my?: boolean, peerId?: TypePeer, date?: number, reaction?: TypeReaction } = {}) {
        super();
        this.flags = args.flags!;
        this.big = args.big;
        this.unread = args.unread;
        this.my = args.my;
        this.peerId = args.peerId!;
        this.date = args.date!;
        this.reaction = args.reaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2356786748, false);
        let flags = 0;
        if (this.big) { flags |= 1 << 0; }
        if (this.unread) { flags |= 1 << 1; }
        if (this.my) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.big !== undefined && this.big !== null) {
        }
        if (this.unread !== undefined && this.unread !== null) {
        }
        if (this.my !== undefined && this.my !== null) {
        }
        writer.write(this.peerId.getBytes());
        writer.writeInt(this.date);
        writer.write(this.reaction.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessagePeerReaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _big = true;
            args.big = _big;
        } else {
            args.big = false;
        }
        if (args.flags & (1 << 1)) {
            const _unread = true;
            args.unread = _unread;
        } else {
            args.unread = false;
        }
        if (args.flags & (1 << 2)) {
            const _my = true;
            args.my = _my;
        } else {
            args.my = false;
        }
        const _peerId = reader.tgReadObject();
        args.peerId = _peerId;
        const _date = reader.readInt();
        args.date = _date;
        const _reaction = reader.tgReadObject();
        args.reaction = _reaction;
        return new MessagePeerReaction(args);
    }
}