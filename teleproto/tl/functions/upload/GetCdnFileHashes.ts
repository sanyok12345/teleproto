import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFileHash } from "../../types/TypeFileHash";

export class GetCdnFileHashes extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2447130417;
    static SUBCLASS_OF_ID = 2777941798;
    static className = "upload.GetCdnFileHashes";
    static classType = "request";

    fileToken!: Buffer;
    offset!: bigint;

    constructor(args: { fileToken?: Buffer, offset?: bigint } = {}) {
        super();
        this.fileToken = args.fileToken!;
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2447130417, false);
        writer.tgWriteBytes(this.fileToken);
        writer.writeLargeInt(this.offset, 64);
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

    static fromReader(reader: BinaryReader): GetCdnFileHashes {
        const args: any = {};
        const _fileToken = reader.tgReadBytes();
        args.fileToken = _fileToken;
        const _offset = reader.readLargeInt(64);
        args.offset = _offset;
        return new GetCdnFileHashes(args);
    }
}