import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputFile } from "../../types/TypeInputFile";
import { TypeDocument } from "../../types/TypeDocument";

export class UploadRingtone extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2199552930;
    static SUBCLASS_OF_ID = 555739168;
    static className = "account.UploadRingtone";
    static classType = "request";

    file!: TypeInputFile;
    fileName!: string;
    mimeType!: string;

    constructor(args: { file?: TypeInputFile, fileName?: string, mimeType?: string } = {}) {
        super();
        this.file = args.file!;
        this.fileName = args.fileName!;
        this.mimeType = args.mimeType!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2199552930, false);
        writer.write(this.file.getBytes());
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

    static fromReader(reader: BinaryReader): UploadRingtone {
        const args: any = {};
        const _file = reader.tgReadObject();
        args.file = _file;
        const _fileName = reader.tgReadString();
        args.fileName = _fileName;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        return new UploadRingtone(args);
    }
}