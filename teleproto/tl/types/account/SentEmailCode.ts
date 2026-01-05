import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentEmailCode extends TLObject {
    static CONSTRUCTOR_ID = 2166326607;
    static SUBCLASS_OF_ID = 1777582190;
    static className = "account.SentEmailCode";
    static classType = "constructor";

    emailPattern!: string;
    length!: number;

    constructor(args: { emailPattern?: string, length?: number } = {}) {
        super();
        this.emailPattern = args.emailPattern!;
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2166326607, false);
        writer.tgWriteString(this.emailPattern);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentEmailCode {
        const args: any = {};
        const _emailPattern = reader.tgReadString();
        args.emailPattern = _emailPattern;
        const _length = reader.readInt();
        args.length = _length;
        return new SentEmailCode(args);
    }
}