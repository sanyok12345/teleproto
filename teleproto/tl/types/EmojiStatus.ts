import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmojiStatus extends TLObject {
    static CONSTRUCTOR_ID = 3892250250;
    static SUBCLASS_OF_ID = 4180717880;
    static className = "EmojiStatus";
    static classType = "constructor";

    flags!: number;
    documentId!: bigint;
    until?: number;

    constructor(args: { flags?: number, documentId?: bigint, until?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.documentId = args.documentId!;
        this.until = args.until;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3892250250, false);
        let flags = 0;
        if (this.until !== undefined && this.until !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.documentId, 64);
        if (this.until !== undefined && this.until !== null) {
            writer.writeInt(this.until);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiStatus {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        if (args.flags & (1 << 0)) {
            const _until = reader.readInt();
            args.until = _until;
        } else {
            args.until = undefined;
        }
        return new EmojiStatus(args);
    }
}