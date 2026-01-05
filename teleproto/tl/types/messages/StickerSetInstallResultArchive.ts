import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStickerSetCovered } from "../TypeStickerSetCovered";

export class StickerSetInstallResultArchive extends TLObject {
    static CONSTRUCTOR_ID = 904138920;
    static SUBCLASS_OF_ID = 1741373416;
    static className = "messages.StickerSetInstallResultArchive";
    static classType = "constructor";

    sets!: TypeStickerSetCovered[];

    constructor(args: { sets?: TypeStickerSetCovered[] } = {}) {
        super();
        this.sets = args.sets!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(904138920, false);
        writer.writeVector(this.sets, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StickerSetInstallResultArchive {
        const args: any = {};
        const _sets = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sets = _sets;
        return new StickerSetInstallResultArchive(args);
    }
}