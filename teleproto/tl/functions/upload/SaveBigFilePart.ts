import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SaveBigFilePart extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3732629309;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "upload.SaveBigFilePart";
    static classType = "request";

    fileId!: bigint;
    filePart!: number;
    fileTotalParts!: number;
    bytes!: Buffer;

    constructor(args: { fileId?: bigint, filePart?: number, fileTotalParts?: number, bytes?: Buffer } = {}) {
        super();
        this.fileId = args.fileId!;
        this.filePart = args.filePart!;
        this.fileTotalParts = args.fileTotalParts!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3732629309, false);
        writer.writeLargeInt(this.fileId, 64);
        writer.writeInt(this.filePart);
        writer.writeInt(this.fileTotalParts);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveBigFilePart {
        const args: any = {};
        const _fileId = reader.readLargeInt(64);
        args.fileId = _fileId;
        const _filePart = reader.readInt();
        args.filePart = _filePart;
        const _fileTotalParts = reader.readInt();
        args.fileTotalParts = _fileTotalParts;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new SaveBigFilePart(args);
    }
}