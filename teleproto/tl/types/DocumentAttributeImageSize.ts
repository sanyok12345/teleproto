import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DocumentAttributeImageSize extends TLObject {
    static CONSTRUCTOR_ID = 1815593308;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeImageSize";
    static classType = "constructor";

    w!: number;
    h!: number;

    constructor(args: { w?: number, h?: number } = {}) {
        super();
        this.w = args.w!;
        this.h = args.h!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1815593308, false);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeImageSize {
        const args: any = {};
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        return new DocumentAttributeImageSize(args);
    }
}