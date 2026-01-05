import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecurePlainEmail extends TLObject {
    static CONSTRUCTOR_ID = 569137759;
    static SUBCLASS_OF_ID = 598912950;
    static className = "SecurePlainEmail";
    static classType = "constructor";

    email!: string;

    constructor(args: { email?: string } = {}) {
        super();
        this.email = args.email!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(569137759, false);
        writer.tgWriteString(this.email);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecurePlainEmail {
        const args: any = {};
        const _email = reader.tgReadString();
        args.email = _email;
        return new SecurePlainEmail(args);
    }
}