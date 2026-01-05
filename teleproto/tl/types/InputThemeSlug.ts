import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputThemeSlug extends TLObject {
    static CONSTRUCTOR_ID = 4119399921;
    static SUBCLASS_OF_ID = 127992048;
    static className = "InputThemeSlug";
    static classType = "constructor";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4119399921, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputThemeSlug {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new InputThemeSlug(args);
    }
}