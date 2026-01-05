import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputDocument } from "./TypeInputDocument";

export class InputBusinessIntro extends TLObject {
    static CONSTRUCTOR_ID = 163867085;
    static SUBCLASS_OF_ID = 1683650173;
    static className = "InputBusinessIntro";
    static classType = "constructor";

    flags!: number;
    title!: string;
    description!: string;
    sticker?: TypeInputDocument;

    constructor(args: { flags?: number, title?: string, description?: string, sticker?: TypeInputDocument } = {}) {
        super();
        this.flags = args.flags!;
        this.title = args.title!;
        this.description = args.description!;
        this.sticker = args.sticker;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(163867085, false);
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

    static fromReader(reader: BinaryReader): InputBusinessIntro {
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
        return new InputBusinessIntro(args);
    }
}