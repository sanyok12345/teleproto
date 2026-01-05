import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputChatThemeUniqueGift extends TLObject {
    static CONSTRUCTOR_ID = 2279989220;
    static SUBCLASS_OF_ID = 1462324836;
    static className = "InputChatThemeUniqueGift";
    static classType = "constructor";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2279989220, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChatThemeUniqueGift {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new InputChatThemeUniqueGift(args);
    }
}