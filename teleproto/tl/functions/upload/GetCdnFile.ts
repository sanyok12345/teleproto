import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeCdnFile } from "../../types/upload/TypeCdnFile";

export class GetCdnFile extends MTProtoRequest {
    static CONSTRUCTOR_ID = 962554330;
    static SUBCLASS_OF_ID = 4123851048;
    static className = "upload.GetCdnFile";
    static classType = "request";

    fileToken!: Buffer;
    offset!: bigint;
    limit!: number;

    constructor(args: { fileToken?: Buffer, offset?: bigint, limit?: number } = {}) {
        super();
        this.fileToken = args.fileToken!;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(962554330, false);
        writer.tgWriteBytes(this.fileToken);
        writer.writeLargeInt(this.offset, 64);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCdnFile {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetCdnFile {
        const args: any = {};
        const _fileToken = reader.tgReadBytes();
        args.fileToken = _fileToken;
        const _offset = reader.readLargeInt(64);
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetCdnFile(args);
    }
}