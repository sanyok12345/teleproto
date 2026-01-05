import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGiftAttributeId } from "./TypeStarGiftAttributeId";

export class StarGiftAttributeCounter extends TLObject {
    static CONSTRUCTOR_ID = 783398488;
    static SUBCLASS_OF_ID = 2351477395;
    static className = "StarGiftAttributeCounter";
    static classType = "constructor";

    attribute!: TypeStarGiftAttributeId;
    count!: number;

    constructor(args: { attribute?: TypeStarGiftAttributeId, count?: number } = {}) {
        super();
        this.attribute = args.attribute!;
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(783398488, false);
        writer.write(this.attribute.getBytes());
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAttributeCounter {
        const args: any = {};
        const _attribute = reader.tgReadObject();
        args.attribute = _attribute;
        const _count = reader.readInt();
        args.count = _count;
        return new StarGiftAttributeCounter(args);
    }
}