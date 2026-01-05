import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputWallPaperSlug extends TLObject {
    static CONSTRUCTOR_ID = 1913199744;
    static SUBCLASS_OF_ID = 4000784410;
    static className = "InputWallPaperSlug";
    static classType = "constructor";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1913199744, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputWallPaperSlug {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new InputWallPaperSlug(args);
    }
}