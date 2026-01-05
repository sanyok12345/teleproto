import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SecurePlainPhone extends TLObject {
    static CONSTRUCTOR_ID = 2103482845;
    static SUBCLASS_OF_ID = 598912950;
    static className = "SecurePlainPhone";
    static classType = "constructor";

    phone!: string;

    constructor(args: { phone?: string } = {}) {
        super();
        this.phone = args.phone!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2103482845, false);
        writer.tgWriteString(this.phone);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SecurePlainPhone {
        const args: any = {};
        const _phone = reader.tgReadString();
        args.phone = _phone;
        return new SecurePlainPhone(args);
    }
}