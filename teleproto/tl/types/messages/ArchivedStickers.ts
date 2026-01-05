import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStickerSetCovered } from "../TypeStickerSetCovered";

export class ArchivedStickers extends TLObject {
    static CONSTRUCTOR_ID = 1338747336;
    static SUBCLASS_OF_ID = 1922488177;
    static className = "messages.ArchivedStickers";
    static classType = "constructor";

    count!: number;
    sets!: TypeStickerSetCovered[];

    constructor(args: { count?: number, sets?: TypeStickerSetCovered[] } = {}) {
        super();
        this.count = args.count!;
        this.sets = args.sets!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1338747336, false);
        writer.writeInt(this.count);
        writer.writeVector(this.sets, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ArchivedStickers {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _sets = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sets = _sets;
        return new ArchivedStickers(args);
    }
}