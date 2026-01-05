import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStickerSetCovered } from "./TypeStickerSetCovered";

export class RecentMeUrlStickerSet extends TLObject {
    static CONSTRUCTOR_ID = 3154794460;
    static SUBCLASS_OF_ID = 1436889209;
    static className = "RecentMeUrlStickerSet";
    static classType = "constructor";

    url!: string;
    set!: TypeStickerSetCovered;

    constructor(args: { url?: string, set?: TypeStickerSetCovered } = {}) {
        super();
        this.url = args.url!;
        this.set = args.set!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3154794460, false);
        writer.tgWriteString(this.url);
        writer.write(this.set.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentMeUrlStickerSet {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _set = reader.tgReadObject();
        args.set = _set;
        return new RecentMeUrlStickerSet(args);
    }
}