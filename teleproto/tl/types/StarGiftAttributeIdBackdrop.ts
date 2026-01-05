import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftAttributeIdBackdrop extends TLObject {
    static CONSTRUCTOR_ID = 520210263;
    static SUBCLASS_OF_ID = 3005295287;
    static className = "StarGiftAttributeIdBackdrop";
    static classType = "constructor";

    backdropId!: number;

    constructor(args: { backdropId?: number } = {}) {
        super();
        this.backdropId = args.backdropId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(520210263, false);
        writer.writeInt(this.backdropId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAttributeIdBackdrop {
        const args: any = {};
        const _backdropId = reader.readInt();
        args.backdropId = _backdropId;
        return new StarGiftAttributeIdBackdrop(args);
    }
}