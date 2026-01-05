import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmailVerifyPurposeLoginSetup extends TLObject {
    static CONSTRUCTOR_ID = 1128644211;
    static SUBCLASS_OF_ID = 3110628072;
    static className = "EmailVerifyPurposeLoginSetup";
    static classType = "constructor";

    phoneNumber!: string;
    phoneCodeHash!: string;

    constructor(args: { phoneNumber?: string, phoneCodeHash?: string } = {}) {
        super();
        this.phoneNumber = args.phoneNumber!;
        this.phoneCodeHash = args.phoneCodeHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1128644211, false);
        writer.tgWriteString(this.phoneNumber);
        writer.tgWriteString(this.phoneCodeHash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerifyPurposeLoginSetup {
        const args: any = {};
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        return new EmailVerifyPurposeLoginSetup(args);
    }
}