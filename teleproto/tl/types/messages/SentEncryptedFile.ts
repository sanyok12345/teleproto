import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeEncryptedFile } from "../TypeEncryptedFile";

export class SentEncryptedFile extends TLObject {
    static CONSTRUCTOR_ID = 2492727090;
    static SUBCLASS_OF_ID = 3382591056;
    static className = "messages.SentEncryptedFile";
    static classType = "constructor";

    date!: number;
    file!: TypeEncryptedFile;

    constructor(args: { date?: number, file?: TypeEncryptedFile } = {}) {
        super();
        this.date = args.date!;
        this.file = args.file!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2492727090, false);
        writer.writeInt(this.date);
        writer.write(this.file.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentEncryptedFile {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        const _file = reader.tgReadObject();
        args.file = _file;
        return new SentEncryptedFile(args);
    }
}