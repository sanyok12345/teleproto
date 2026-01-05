import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ChannelDifferenceEmpty extends TLObject {
    static CONSTRUCTOR_ID = 1041346555;
    static SUBCLASS_OF_ID = 696872797;
    static className = "updates.ChannelDifferenceEmpty";
    static classType = "constructor";

    flags!: number;
    final?: boolean;
    pts!: number;
    timeout?: number;

    constructor(args: { flags?: number, final?: boolean, pts?: number, timeout?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.final = args.final;
        this.pts = args.pts!;
        this.timeout = args.timeout;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1041346555, false);
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
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelDifferenceEmpty {
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
        return new ChannelDifferenceEmpty(args);
    }
}