import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class GroupCallDiscarded extends TLObject {
    static CONSTRUCTOR_ID = 2004925620;
    static SUBCLASS_OF_ID = 548729632;
    static className = "GroupCallDiscarded";
    static classType = "constructor";

    id!: bigint;
    accessHash!: bigint;
    duration!: number;

    constructor(args: { id?: bigint, accessHash?: bigint, duration?: number } = {}) {
        super();
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.duration = args.duration!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2004925620, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.duration);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallDiscarded {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _duration = reader.readInt();
        args.duration = _duration;
        return new GroupCallDiscarded(args);
    }
}