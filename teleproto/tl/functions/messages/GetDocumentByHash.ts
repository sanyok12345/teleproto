import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDocument } from "../../types/TypeDocument";

export class GetDocumentByHash extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2985428511;
    static SUBCLASS_OF_ID = 555739168;
    static className = "messages.GetDocumentByHash";
    static classType = "request";

    sha256!: Buffer;
    size!: bigint;
    mimeType!: string;

    constructor(args: { sha256?: Buffer, size?: bigint, mimeType?: string } = {}) {
        super();
        this.sha256 = args.sha256!;
        this.size = args.size!;
        this.mimeType = args.mimeType!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2985428511, false);
        writer.tgWriteBytes(this.sha256);
        writer.writeLargeInt(this.size, 64);
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

    static fromReader(reader: BinaryReader): GetDocumentByHash {
        const args: any = {};
        const _sha256 = reader.tgReadBytes();
        args.sha256 = _sha256;
        const _size = reader.readLargeInt(64);
        args.size = _size;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        return new GetDocumentByHash(args);
    }
}