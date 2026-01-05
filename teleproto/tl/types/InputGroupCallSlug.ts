import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputGroupCallSlug extends TLObject {
    static CONSTRUCTOR_ID = 4261839423;
    static SUBCLASS_OF_ID = 1482758833;
    static className = "InputGroupCallSlug";
    static classType = "constructor";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4261839423, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputGroupCallSlug {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new InputGroupCallSlug(args);
    }
}