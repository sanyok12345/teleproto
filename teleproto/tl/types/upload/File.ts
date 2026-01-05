import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeFileType } from "../storage/TypeFileType";

export class File extends TLObject {
    static CONSTRUCTOR_ID = 157948117;
    static SUBCLASS_OF_ID = 1822152488;
    static className = "upload.File";
    static classType = "constructor";

    type!: TypeFileType;
    mtime!: number;
    bytes!: Buffer;

    constructor(args: { type?: TypeFileType, mtime?: number, bytes?: Buffer } = {}) {
        super();
        this.type = args.type!;
        this.mtime = args.mtime!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(157948117, false);
        writer.write(this.type.getBytes());
        writer.writeInt(this.mtime);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): File {
        const args: any = {};
        const _type = reader.tgReadObject();
        args.type = _type;
        const _mtime = reader.readInt();
        args.mtime = _mtime;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new File(args);
    }
}