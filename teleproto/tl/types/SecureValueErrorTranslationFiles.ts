import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSecureValueType } from "./TypeSecureValueType";

export class SecureValueErrorTranslationFiles extends TLObject {
    static CONSTRUCTOR_ID = 878931416;
    static SUBCLASS_OF_ID = 101146574;
    static className = "SecureValueErrorTranslationFiles";
    static classType = "constructor";

    type!: TypeSecureValueType;
    fileHash!: Buffer[];
    text!: string;

    constructor(args: { type?: TypeSecureValueType, fileHash?: Buffer[], text?: string } = {}) {
        super();
        this.type = args.type!;
        this.fileHash = args.fileHash!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(878931416, false);
        writer.write(this.type.getBytes());
        writer.writeVector(this.fileHash, (item) => {
            writer.tgWriteBytes(item);
        });
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecureValueErrorTranslationFiles {
        const args: any = {};
        const _type = reader.tgReadObject();
        args.type = _type;
        const _fileHash = reader.readVector((reader) => {
            const item = reader.tgReadBytes();
            return item;
        });
        args.fileHash = _fileHash;
        const _text = reader.tgReadString();
        args.text = _text;
        return new SecureValueErrorTranslationFiles(args);
    }
}