import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhotoStrippedSize extends TLObject {
    static CONSTRUCTOR_ID = 3769678894;
    static SUBCLASS_OF_ID = 399256025;
    static className = "PhotoStrippedSize";
    static classType = "constructor";

    type!: string;
    bytes!: Buffer;

    constructor(args: { type?: string, bytes?: Buffer } = {}) {
        super();
        this.type = args.type!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3769678894, false);
        writer.tgWriteString(this.type);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhotoStrippedSize {
        const args: any = {};
        const _type = reader.tgReadString();
        args.type = _type;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new PhotoStrippedSize(args);
    }
}