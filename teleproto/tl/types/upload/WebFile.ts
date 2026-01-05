import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeFileType } from "../storage/TypeFileType";

export class WebFile extends TLObject {
    static CONSTRUCTOR_ID = 568808380;
    static SUBCLASS_OF_ID = 1760657233;
    static className = "upload.WebFile";
    static classType = "constructor";

    size!: number;
    mimeType!: string;
    fileType!: TypeFileType;
    mtime!: number;
    bytes!: Buffer;

    constructor(args: { size?: number, mimeType?: string, fileType?: TypeFileType, mtime?: number, bytes?: Buffer } = {}) {
        super();
        this.size = args.size!;
        this.mimeType = args.mimeType!;
        this.fileType = args.fileType!;
        this.mtime = args.mtime!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(568808380, false);
        writer.writeInt(this.size);
        writer.tgWriteString(this.mimeType);
        writer.write(this.fileType.getBytes());
        writer.writeInt(this.mtime);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebFile {
        const args: any = {};
        const _size = reader.readInt();
        args.size = _size;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        const _fileType = reader.tgReadObject();
        args.fileType = _fileType;
        const _mtime = reader.readInt();
        args.mtime = _mtime;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new WebFile(args);
    }
}