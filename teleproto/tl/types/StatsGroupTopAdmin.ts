import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsGroupTopAdmin extends TLObject {
    static CONSTRUCTOR_ID = 3612888199;
    static SUBCLASS_OF_ID = 2150997085;
    static className = "StatsGroupTopAdmin";
    static classType = "constructor";

    userId!: bigint;
    deleted!: number;
    kicked!: number;
    banned!: number;

    constructor(args: { userId?: bigint, deleted?: number, kicked?: number, banned?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.deleted = args.deleted!;
        this.kicked = args.kicked!;
        this.banned = args.banned!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3612888199, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.deleted);
        writer.writeInt(this.kicked);
        writer.writeInt(this.banned);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsGroupTopAdmin {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _deleted = reader.readInt();
        args.deleted = _deleted;
        const _kicked = reader.readInt();
        args.kicked = _kicked;
        const _banned = reader.readInt();
        args.banned = _banned;
        return new StatsGroupTopAdmin(args);
    }
}