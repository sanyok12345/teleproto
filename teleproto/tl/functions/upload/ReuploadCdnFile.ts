import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFileHash } from "../../types/TypeFileHash";

export class ReuploadCdnFile extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2603046056;
    static SUBCLASS_OF_ID = 2777941798;
    static className = "upload.ReuploadCdnFile";
    static classType = "request";

    fileToken!: Buffer;
    requestToken!: Buffer;

    constructor(args: { fileToken?: Buffer, requestToken?: Buffer } = {}) {
        super();
        this.fileToken = args.fileToken!;
        this.requestToken = args.requestToken!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2603046056, false);
        writer.tgWriteBytes(this.fileToken);
        writer.tgWriteBytes(this.requestToken);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFileHash[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReuploadCdnFile {
        const args: any = {};
        const _fileToken = reader.tgReadBytes();
        args.fileToken = _fileToken;
        const _requestToken = reader.tgReadBytes();
        args.requestToken = _requestToken;
        return new ReuploadCdnFile(args);
    }
}