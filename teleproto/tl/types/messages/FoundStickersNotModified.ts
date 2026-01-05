import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FoundStickersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1611711796;
    static SUBCLASS_OF_ID = 104866129;
    static className = "messages.FoundStickersNotModified";
    static classType = "constructor";

    flags!: number;
    nextOffset?: number;

    constructor(args: { flags?: number, nextOffset?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.nextOffset = args.nextOffset;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1611711796, false);
        let flags = 0;
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.writeInt(this.nextOffset);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FoundStickersNotModified {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _nextOffset = reader.readInt();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        return new FoundStickersNotModified(args);
    }
}