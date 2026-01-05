import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReportResultAddComment extends TLObject {
    static CONSTRUCTOR_ID = 1862904881;
    static SUBCLASS_OF_ID = 2899571768;
    static className = "ReportResultAddComment";
    static classType = "constructor";

    flags!: number;
    optional?: boolean;
    option!: Buffer;

    constructor(args: { flags?: number, optional?: boolean, option?: Buffer } = {}) {
        super();
        this.flags = args.flags!;
        this.optional = args.optional;
        this.option = args.option!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1862904881, false);
        let flags = 0;
        if (this.optional) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.optional !== undefined && this.optional !== null) {
        }
        writer.tgWriteBytes(this.option);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReportResultAddComment {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _optional = true;
            args.optional = _optional;
        } else {
            args.optional = false;
        }
        const _option = reader.tgReadBytes();
        args.option = _option;
        return new ReportResultAddComment(args);
    }
}