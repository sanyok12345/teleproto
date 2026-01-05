import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAttributeIdPattern extends TLObject {
    static CONSTRUCTOR_ID = 1242965043;
    static SUBCLASS_OF_ID = 3005295287;
    static className = "StarGiftAttributeIdPattern";
    static classType = "constructor";

    documentId!: bigint;

    constructor(args: { documentId?: bigint } = {}) {
        super();
        this.documentId = args.documentId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1242965043, false);
        writer.writeLargeInt(this.documentId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAttributeIdPattern {
        const args: any = {};
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        return new StarGiftAttributeIdPattern(args);
    }
}