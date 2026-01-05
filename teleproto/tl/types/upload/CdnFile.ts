import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CdnFile extends TLObject {
    static CONSTRUCTOR_ID = 2845821519;
    static SUBCLASS_OF_ID = 4123851048;
    static className = "upload.CdnFile";
    static classType = "constructor";

    bytes!: Buffer;

    constructor(args: { bytes?: Buffer } = {}) {
        super();
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2845821519, false);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CdnFile {
        const args: any = {};
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new CdnFile(args);
    }
}