import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelForbidden extends TLObject {
    static CONSTRUCTOR_ID = 399807445;
    static SUBCLASS_OF_ID = 3316604308;
    static className = "ChannelForbidden";
    static classType = "constructor";

    flags!: number;
    broadcast?: boolean;
    megagroup?: boolean;
    id!: bigint;
    accessHash!: bigint;
    title!: string;
    untilDate?: number;

    constructor(args: { flags?: number, broadcast?: boolean, megagroup?: boolean, id?: bigint, accessHash?: bigint, title?: string, untilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.broadcast = args.broadcast;
        this.megagroup = args.megagroup;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.title = args.title!;
        this.untilDate = args.untilDate;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(399807445, false);
        let flags = 0;
        if (this.broadcast) { flags |= 1 << 5; }
        if (this.megagroup) { flags |= 1 << 8; }
        if (this.untilDate !== undefined && this.untilDate !== null) { flags |= 1 << 16; }
        writer.writeInt(flags, false);
        if (this.broadcast !== undefined && this.broadcast !== null) {
        }
        if (this.megagroup !== undefined && this.megagroup !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteString(this.title);
        if (this.untilDate !== undefined && this.untilDate !== null) {
            writer.writeInt(this.untilDate);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelForbidden {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 5)) {
            const _broadcast = true;
            args.broadcast = _broadcast;
        } else {
            args.broadcast = false;
        }
        if (args.flags & (1 << 8)) {
            const _megagroup = true;
            args.megagroup = _megagroup;
        } else {
            args.megagroup = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _title = reader.tgReadString();
        args.title = _title;
        if (args.flags & (1 << 16)) {
            const _untilDate = reader.readInt();
            args.untilDate = _untilDate;
        } else {
            args.untilDate = undefined;
        }
        return new ChannelForbidden(args);
    }
}