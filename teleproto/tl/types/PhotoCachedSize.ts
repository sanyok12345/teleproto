import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhotoCachedSize extends TLObject {
    static CONSTRUCTOR_ID = 35527382;
    static SUBCLASS_OF_ID = 399256025;
    static className = "PhotoCachedSize";
    static classType = "constructor";

    type!: string;
    w!: number;
    h!: number;
    bytes!: Buffer;

    constructor(args: { type?: string, w?: number, h?: number, bytes?: Buffer } = {}) {
        super();
        this.type = args.type!;
        this.w = args.w!;
        this.h = args.h!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(35527382, false);
        writer.tgWriteString(this.type);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhotoCachedSize {
        const args: any = {};
        const _type = reader.tgReadString();
        args.type = _type;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new PhotoCachedSize(args);
    }
}