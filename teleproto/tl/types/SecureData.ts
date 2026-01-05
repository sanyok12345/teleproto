import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecureData extends TLObject {
    static CONSTRUCTOR_ID = 2330640067;
    static SUBCLASS_OF_ID = 2094276276;
    static className = "SecureData";
    static classType = "constructor";

    data!: Buffer;
    dataHash!: Buffer;
    secret!: Buffer;

    constructor(args: { data?: Buffer, dataHash?: Buffer, secret?: Buffer } = {}) {
        super();
        this.data = args.data!;
        this.dataHash = args.dataHash!;
        this.secret = args.secret!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2330640067, false);
        writer.tgWriteBytes(this.data);
        writer.tgWriteBytes(this.dataHash);
        writer.tgWriteBytes(this.secret);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureData {
        const args: any = {};
        const _data = reader.tgReadBytes();
        args.data = _data;
        const _dataHash = reader.tgReadBytes();
        args.dataHash = _dataHash;
        const _secret = reader.tgReadBytes();
        args.secret = _secret;
        return new SecureData(args);
    }
}