import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhotoSizeEmpty extends TLObject {
    static CONSTRUCTOR_ID = 236446268;
    static SUBCLASS_OF_ID = 399256025;
    static className = "PhotoSizeEmpty";
    static classType = "constructor";

    type!: string;

    constructor(args: { type?: string } = {}) {
        super();
        this.type = args.type!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(236446268, false);
        writer.tgWriteString(this.type);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhotoSizeEmpty {
        const args: any = {};
        const _type = reader.tgReadString();
        args.type = _type;
        return new PhotoSizeEmpty(args);
    }
}