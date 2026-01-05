import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGiftCollection } from "../TypeStarGiftCollection";

export class StarGiftCollections extends TLObject {
    static CONSTRUCTOR_ID = 2317955827;
    static SUBCLASS_OF_ID = 4028047852;
    static className = "payments.StarGiftCollections";
    static classType = "constructor";

    collections!: TypeStarGiftCollection[];

    constructor(args: { collections?: TypeStarGiftCollection[] } = {}) {
        super();
        this.collections = args.collections!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2317955827, false);
        writer.writeVector(this.collections, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftCollections {
        const args: any = {};
        const _collections = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.collections = _collections;
        return new StarGiftCollections(args);
    }
}