import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";

export class WebPageAttributeStarGiftCollection extends TLObject {
    static CONSTRUCTOR_ID = 835375875;
    static SUBCLASS_OF_ID = 2949638599;
    static className = "WebPageAttributeStarGiftCollection";
    static classType = "constructor";

    icons!: TypeDocument[];

    constructor(args: { icons?: TypeDocument[] } = {}) {
        super();
        this.icons = args.icons!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(835375875, false);
        writer.writeVector(this.icons, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageAttributeStarGiftCollection {
        const args: any = {};
        const _icons = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.icons = _icons;
        return new WebPageAttributeStarGiftCollection(args);
    }
}