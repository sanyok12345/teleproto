import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAttributeIdModel extends TLObject {
    static CONSTRUCTOR_ID = 1219145276;
    static SUBCLASS_OF_ID = 3005295287;
    static className = "StarGiftAttributeIdModel";
    static classType = "constructor";

    documentId!: bigint;

    constructor(args: { documentId?: bigint } = {}) {
        super();
        this.documentId = args.documentId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1219145276, false);
        writer.writeLargeInt(this.documentId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAttributeIdModel {
        const args: any = {};
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        return new StarGiftAttributeIdModel(args);
    }
}