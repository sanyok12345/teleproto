import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeFileHash } from "../TypeFileHash";

export class FileCdnRedirect extends TLObject {
    static CONSTRUCTOR_ID = 4052539972;
    static SUBCLASS_OF_ID = 1822152488;
    static className = "upload.FileCdnRedirect";
    static classType = "constructor";

    dcId!: number;
    fileToken!: Buffer;
    encryptionKey!: Buffer;
    encryptionIv!: Buffer;
    fileHashes!: TypeFileHash[];

    constructor(args: { dcId?: number, fileToken?: Buffer, encryptionKey?: Buffer, encryptionIv?: Buffer, fileHashes?: TypeFileHash[] } = {}) {
        super();
        this.dcId = args.dcId!;
        this.fileToken = args.fileToken!;
        this.encryptionKey = args.encryptionKey!;
        this.encryptionIv = args.encryptionIv!;
        this.fileHashes = args.fileHashes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4052539972, false);
        writer.writeInt(this.dcId);
        writer.tgWriteBytes(this.fileToken);
        writer.tgWriteBytes(this.encryptionKey);
        writer.tgWriteBytes(this.encryptionIv);
        writer.writeVector(this.fileHashes, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FileCdnRedirect {
        const args: any = {};
        const _dcId = reader.readInt();
        args.dcId = _dcId;
        const _fileToken = reader.tgReadBytes();
        args.fileToken = _fileToken;
        const _encryptionKey = reader.tgReadBytes();
        args.encryptionKey = _encryptionKey;
        const _encryptionIv = reader.tgReadBytes();
        args.encryptionIv = _encryptionIv;
        const _fileHashes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.fileHashes = _fileHashes;
        return new FileCdnRedirect(args);
    }
}