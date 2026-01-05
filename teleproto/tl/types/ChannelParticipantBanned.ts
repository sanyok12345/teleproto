import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeChatBannedRights } from "./TypeChatBannedRights";

export class ChannelParticipantBanned extends TLObject {
    static CONSTRUCTOR_ID = 1844969806;
    static SUBCLASS_OF_ID = 3653762072;
    static className = "ChannelParticipantBanned";
    static classType = "constructor";

    flags!: number;
    left?: boolean;
    peer!: TypePeer;
    kickedBy!: bigint;
    date!: number;
    bannedRights!: TypeChatBannedRights;

    constructor(args: { flags?: number, left?: boolean, peer?: TypePeer, kickedBy?: bigint, date?: number, bannedRights?: TypeChatBannedRights } = {}) {
        super();
        this.flags = args.flags!;
        this.left = args.left;
        this.peer = args.peer!;
        this.kickedBy = args.kickedBy!;
        this.date = args.date!;
        this.bannedRights = args.bannedRights!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1844969806, false);
        let flags = 0;
        if (this.left) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.left !== undefined && this.left !== null) {
        }
        writer.write(this.peer.getBytes());
        writer.writeLargeInt(this.kickedBy, 64);
        writer.writeInt(this.date);
        writer.write(this.bannedRights.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantBanned {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _left = true;
            args.left = _left;
        } else {
            args.left = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _kickedBy = reader.readLargeInt(64);
        args.kickedBy = _kickedBy;
        const _date = reader.readInt();
        args.date = _date;
        const _bannedRights = reader.tgReadObject();
        args.bannedRights = _bannedRights;
        return new ChannelParticipantBanned(args);
    }
}