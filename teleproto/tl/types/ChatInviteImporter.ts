import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatInviteImporter extends TLObject {
    static CONSTRUCTOR_ID = 2354765785;
    static SUBCLASS_OF_ID = 1393710126;
    static className = "ChatInviteImporter";
    static classType = "constructor";

    flags!: number;
    requested?: boolean;
    viaChatlist?: boolean;
    userId!: bigint;
    date!: number;
    about?: string;
    approvedBy?: bigint;

    constructor(args: { flags?: number, requested?: boolean, viaChatlist?: boolean, userId?: bigint, date?: number, about?: string, approvedBy?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.requested = args.requested;
        this.viaChatlist = args.viaChatlist;
        this.userId = args.userId!;
        this.date = args.date!;
        this.about = args.about;
        this.approvedBy = args.approvedBy;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2354765785, false);
        let flags = 0;
        if (this.requested) { flags |= 1 << 0; }
        if (this.viaChatlist) { flags |= 1 << 3; }
        if (this.about !== undefined && this.about !== null) { flags |= 1 << 2; }
        if (this.approvedBy !== undefined && this.approvedBy !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.requested !== undefined && this.requested !== null) {
        }
        if (this.viaChatlist !== undefined && this.viaChatlist !== null) {
        }
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.date);
        if (this.about !== undefined && this.about !== null) {
            writer.tgWriteString(this.about);
        }
        if (this.approvedBy !== undefined && this.approvedBy !== null) {
            writer.writeLargeInt(this.approvedBy, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatInviteImporter {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _requested = true;
            args.requested = _requested;
        } else {
            args.requested = false;
        }
        if (args.flags & (1 << 3)) {
            const _viaChatlist = true;
            args.viaChatlist = _viaChatlist;
        } else {
            args.viaChatlist = false;
        }
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _date = reader.readInt();
        args.date = _date;
        if (args.flags & (1 << 2)) {
            const _about = reader.tgReadString();
            args.about = _about;
        } else {
            args.about = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _approvedBy = reader.readLargeInt(64);
            args.approvedBy = _approvedBy;
        } else {
            args.approvedBy = undefined;
        }
        return new ChatInviteImporter(args);
    }
}