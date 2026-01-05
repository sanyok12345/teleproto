import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhotoSize extends TLObject {
    static CONSTRUCTOR_ID = 1976012384;
    static SUBCLASS_OF_ID = 399256025;
    static className = "PhotoSize";
    static classType = "constructor";

    type!: string;
    w!: number;
    h!: number;
    size!: number;

    constructor(args: { type?: string, w?: number, h?: number, size?: number } = {}) {
        super();
        this.type = args.type!;
        this.w = args.w!;
        this.h = args.h!;
        this.size = args.size!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1976012384, false);
        writer.tgWriteString(this.type);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        writer.writeInt(this.size);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhotoSize {
        const args: any = {};
        const _type = reader.tgReadString();
        args.type = _type;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        const _size = reader.readInt();
        args.size = _size;
        return new PhotoSize(args);
    }
}