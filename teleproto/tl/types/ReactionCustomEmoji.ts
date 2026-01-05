import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReactionCustomEmoji extends TLObject {
    static CONSTRUCTOR_ID = 2302016627;
    static SUBCLASS_OF_ID = 1570858401;
    static className = "ReactionCustomEmoji";
    static classType = "constructor";

    documentId!: bigint;

    constructor(args: { documentId?: bigint } = {}) {
        super();
        this.documentId = args.documentId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2302016627, false);
        writer.writeLargeInt(this.documentId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionCustomEmoji {
        const args: any = {};
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        return new ReactionCustomEmoji(args);
    }
}