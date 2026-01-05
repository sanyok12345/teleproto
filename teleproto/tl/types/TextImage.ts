import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TextImage extends TLObject {
    static CONSTRUCTOR_ID = 136105807;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextImage";
    static classType = "constructor";

    documentId!: bigint;
    w!: number;
    h!: number;

    constructor(args: { documentId?: bigint, w?: number, h?: number } = {}) {
        super();
        this.documentId = args.documentId!;
        this.w = args.w!;
        this.h = args.h!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(136105807, false);
        writer.writeLargeInt(this.documentId, 64);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextImage {
        const args: any = {};
        const _documentId = reader.readLargeInt(64);
        args.documentId = _documentId;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        return new TextImage(args);
    }
}