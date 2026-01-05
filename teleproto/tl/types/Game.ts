import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePhoto } from "./TypePhoto";
import { TypeDocument } from "./TypeDocument";

export class Game extends TLObject {
    static CONSTRUCTOR_ID = 3187238203;
    static SUBCLASS_OF_ID = 2199494322;
    static className = "Game";
    static classType = "constructor";

    flags!: number;
    id!: bigint;
    accessHash!: bigint;
    shortName!: string;
    title!: string;
    description!: string;
    photo!: TypePhoto;
    document?: TypeDocument;

    constructor(args: { flags?: number, id?: bigint, accessHash?: bigint, shortName?: string, title?: string, description?: string, photo?: TypePhoto, document?: TypeDocument } = {}) {
        super();
        this.flags = args.flags!;
        this.id = args.id!;
        this.accessHash = args.accessHash!;
        this.shortName = args.shortName!;
        this.title = args.title!;
        this.description = args.description!;
        this.photo = args.photo!;
        this.document = args.document;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3187238203, false);
        let flags = 0;
        if (this.document !== undefined && this.document !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.id, 64);
        writer.writeLargeInt(this.accessHash, 64);
        writer.tgWriteString(this.shortName);
        writer.tgWriteString(this.title);
        writer.tgWriteString(this.description);
        writer.write(this.photo.getBytes());
        if (this.document !== undefined && this.document !== null) {
            writer.write(this.document.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Game {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _shortName = reader.tgReadString();
        args.shortName = _shortName;
        const _title = reader.tgReadString();
        args.title = _title;
        const _description = reader.tgReadString();
        args.description = _description;
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        if (args.flags & (1 << 0)) {
            const _document = reader.tgReadObject();
            args.document = _document;
        } else {
            args.document = undefined;
        }
        return new Game(args);
    }
}