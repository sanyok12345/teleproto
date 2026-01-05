import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGiftAttribute } from "../TypeStarGiftAttribute";

export class StarGiftUpgradeAttributes extends TLObject {
    static CONSTRUCTOR_ID = 1187439471;
    static SUBCLASS_OF_ID = 256290031;
    static className = "payments.StarGiftUpgradeAttributes";
    static classType = "constructor";

    attributes!: TypeStarGiftAttribute[];

    constructor(args: { attributes?: TypeStarGiftAttribute[] } = {}) {
        super();
        this.attributes = args.attributes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1187439471, false);
        writer.writeVector(this.attributes, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftUpgradeAttributes {
        const args: any = {};
        const _attributes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.attributes = _attributes;
        return new StarGiftUpgradeAttributes(args);
    }
}