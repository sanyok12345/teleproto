import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputFile } from "../../types/TypeInputFile";
import { TypeDocument } from "../../types/TypeDocument";

export class UploadTheme extends MTProtoRequest {
    static CONSTRUCTOR_ID = 473805619;
    static SUBCLASS_OF_ID = 555739168;
    static className = "account.UploadTheme";
    static classType = "request";

    flags?: number;
    file!: TypeInputFile;
    thumb?: TypeInputFile;
    fileName!: string;
    mimeType!: string;

    constructor(args: { flags?: number, file?: TypeInputFile, thumb?: TypeInputFile, fileName?: string, mimeType?: string } = {}) {
        super();
        this.flags = args.flags;
        this.file = args.file!;
        this.thumb = args.thumb;
        this.fileName = args.fileName!;
        this.mimeType = args.mimeType!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(473805619, false);
        let flags = 0;
        if (this.thumb !== undefined && this.thumb !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.file.getBytes());
        if (this.thumb !== undefined && this.thumb !== null) {
            writer.write(this.thumb.getBytes());
        }
        writer.tgWriteString(this.fileName);
        writer.tgWriteString(this.mimeType);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDocument {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UploadTheme {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _file = reader.tgReadObject();
        args.file = _file;
        if (args.flags & (1 << 0)) {
            const _thumb = reader.tgReadObject();
            args.thumb = _thumb;
        } else {
            args.thumb = undefined;
        }
        const _fileName = reader.tgReadString();
        args.fileName = _fileName;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        return new UploadTheme(args);
    }
}