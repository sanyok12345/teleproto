import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocument } from "./TypeDocument";

export class BusinessIntro extends TLObject {
    static CONSTRUCTOR_ID = 1510606445;
    static SUBCLASS_OF_ID = 1694815175;
    static className = "BusinessIntro";
    static classType = "constructor";

    flags!: number;
    title!: string;
    description!: string;
    sticker?: TypeDocument;

    constructor(args: { flags?: number, title?: string, description?: string, sticker?: TypeDocument } = {}) {
        super();
        this.flags = args.flags!;
        this.title = args.title!;
        this.description = args.description!;
        this.sticker = args.sticker;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1510606445, false);
        let flags = 0;
        if (this.sticker !== undefined && this.sticker !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        if (this.sticker !== undefined && this.sticker !== null) {
            writer.write(this.sticker.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessIntro {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _title = reader.tgReadString();
        args.title = _title;
        const _description = reader.tgReadString();
        args.description = _description;
        if (args.flags & (1 << 0)) {
            const _sticker = reader.tgReadObject();
            args.sticker = _sticker;
        } else {
            args.sticker = undefined;
        }
        return new BusinessIntro(args);
    }
}