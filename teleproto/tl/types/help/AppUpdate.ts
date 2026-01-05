import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMessageEntity } from "../TypeMessageEntity";
import { TypeDocument } from "../TypeDocument";

export class AppUpdate extends TLObject {
    static CONSTRUCTOR_ID = 3434860080;
    static SUBCLASS_OF_ID = 1486292638;
    static className = "help.AppUpdate";
    static classType = "constructor";

    flags!: number;
    canNotSkip?: boolean;
    id!: number;
    version!: string;
    text!: string;
    entities!: TypeMessageEntity[];
    document?: TypeDocument;
    url?: string;
    sticker?: TypeDocument;

    constructor(args: { flags?: number, canNotSkip?: boolean, id?: number, version?: string, text?: string, entities?: TypeMessageEntity[], document?: TypeDocument, url?: string, sticker?: TypeDocument } = {}) {
        super();
        this.flags = args.flags!;
        this.canNotSkip = args.canNotSkip;
        this.id = args.id!;
        this.version = args.version!;
        this.text = args.text!;
        this.entities = args.entities!;
        this.document = args.document;
        this.url = args.url;
        this.sticker = args.sticker;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3434860080, false);
        let flags = 0;
        if (this.canNotSkip) { flags |= 1 << 0; }
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 1; }
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 2; }
        if (this.sticker !== undefined && this.sticker !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.canNotSkip !== undefined && this.canNotSkip !== null) {
        }
        writer.writeInt(this.id);
        writer.tgWriteString(this.version);
        writer.tgWriteString(this.text);
        writer.writeVector(this.entities, (item) => {
            writer.write(item.getBytes());
        });
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        if (this.sticker !== undefined && this.sticker !== null) {
            writer.write(this.sticker.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AppUpdate {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _canNotSkip = true;
            args.canNotSkip = _canNotSkip;
        } else {
            args.canNotSkip = false;
        }
        const _id = reader.readInt();
        args.id = _id;
        const _version = reader.tgReadString();
        args.version = _version;
        const _text = reader.tgReadString();
        args.text = _text;
        const _entities = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.entities = _entities;
        if (args.flags & (1 << 1)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _sticker = reader.tgReadObject();
            args.sticker = _sticker;
        } else {
            args.sticker = undefined;
        }
        return new AppUpdate(args);
    }
}