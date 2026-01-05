import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeer } from "../TypePeer";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class CheckedGiftCode extends TLObject {
    static CONSTRUCTOR_ID = 3952623503;
    static SUBCLASS_OF_ID = 1529452520;
    static className = "payments.CheckedGiftCode";
    static classType = "constructor";

    flags!: number;
    viaGiveaway?: boolean;
    fromId?: TypePeer;
    giveawayMsgId?: number;
    toId?: bigint;
    date!: number;
    days!: number;
    usedDate?: number;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, viaGiveaway?: boolean, fromId?: TypePeer, giveawayMsgId?: number, toId?: bigint, date?: number, days?: number, usedDate?: number, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.viaGiveaway = args.viaGiveaway;
        this.fromId = args.fromId;
        this.giveawayMsgId = args.giveawayMsgId;
        this.toId = args.toId;
        this.date = args.date!;
        this.days = args.days!;
        this.usedDate = args.usedDate;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3952623503, false);
        let flags = 0;
        if (this.viaGiveaway) { flags |= 1 << 2; }
        if (this.fromId !== undefined && this.fromId !== null) { flags |= 1 << 4; }
        if (this.giveawayMsgId !== undefined && this.giveawayMsgId !== null) { flags |= 1 << 3; }
        if (this.toId !== undefined && this.toId !== null) { flags |= 1 << 0; }
        if (this.usedDate !== undefined && this.usedDate !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.viaGiveaway !== undefined && this.viaGiveaway !== null) {
        }
        if (this.fromId !== undefined && this.fromId !== null) {
            writer.write(this.fromId.getBytes());
        }
        if (this.giveawayMsgId !== undefined && this.giveawayMsgId !== null) {
            writer.writeInt(this.giveawayMsgId);
        }
        if (this.toId !== undefined && this.toId !== null) {
            writer.writeLargeInt(this.toId, 64);
        }
        writer.writeInt(this.date);
        writer.writeInt(this.days);
        if (this.usedDate !== undefined && this.usedDate !== null) {
            writer.writeInt(this.usedDate);
        }
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CheckedGiftCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _viaGiveaway = true;
            args.viaGiveaway = _viaGiveaway;
        } else {
            args.viaGiveaway = false;
        }
        if (args.flags & (1 << 4)) {
            const _fromId = reader.tgReadObject();
            args.fromId = _fromId;
        } else {
            args.fromId = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _giveawayMsgId = reader.readInt();
            args.giveawayMsgId = _giveawayMsgId;
        } else {
            args.giveawayMsgId = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _toId = reader.readLargeInt(64);
            args.toId = _toId;
        } else {
            args.toId = undefined;
        }
        const _date = reader.readInt();
        args.date = _date;
        const _days = reader.readInt();
        args.days = _days;
        if (args.flags & (1 << 1)) {
            const _usedDate = reader.readInt();
            args.usedDate = _usedDate;
        } else {
            args.usedDate = undefined;
        }
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
        return new CheckedGiftCode(args);
    }
}