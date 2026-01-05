import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateNewAuthorization extends TLObject {
    static CONSTRUCTOR_ID = 2303831023;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateNewAuthorization";
    static classType = "constructor";

    flags!: number;
    unconfirmed?: boolean;
    hash!: bigint;
    date?: number;
    device?: string;
    location?: string;

    constructor(args: { flags?: number, unconfirmed?: boolean, hash?: bigint, date?: number, device?: string, location?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.unconfirmed = args.unconfirmed;
        this.hash = args.hash!;
        this.date = args.date;
        this.device = args.device;
        this.location = args.location;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2303831023, false);
        let flags = 0;
        if (this.unconfirmed) { flags |= 1 << 0; }
        if (this.date !== undefined && this.date !== null) { flags |= 1 << 0; }
        if (this.device !== undefined && this.device !== null) { flags |= 1 << 0; }
        if (this.location !== undefined && this.location !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.unconfirmed !== undefined && this.unconfirmed !== null) {
        }
        writer.writeLargeInt(this.hash, 64);
        if (this.date !== undefined && this.date !== null) {
            writer.writeInt(this.date);
        }
        if (this.device !== undefined && this.device !== null) {
            writer.tgWriteString(this.device);
        }
        if (this.location !== undefined && this.location !== null) {
            writer.tgWriteString(this.location);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateNewAuthorization {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _unconfirmed = true;
            args.unconfirmed = _unconfirmed;
        } else {
            args.unconfirmed = false;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        if (args.flags & (1 << 0)) {
            const _date = reader.readInt();
            args.date = _date;
        } else {
            args.date = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _device = reader.tgReadString();
            args.device = _device;
        } else {
            args.device = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _location = reader.tgReadString();
            args.location = _location;
        } else {
            args.location = undefined;
        }
        return new UpdateNewAuthorization(args);
    }
}