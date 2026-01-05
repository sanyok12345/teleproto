import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSentCode } from "../auth/TypeSentCode";

export class EmailVerifiedLogin extends TLObject {
    static CONSTRUCTOR_ID = 3787132257;
    static SUBCLASS_OF_ID = 1686319496;
    static className = "account.EmailVerifiedLogin";
    static classType = "constructor";

    email!: string;
    sentCode!: TypeSentCode;

    constructor(args: { email?: string, sentCode?: TypeSentCode } = {}) {
        super();
        this.email = args.email!;
        this.sentCode = args.sentCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3787132257, false);
        writer.tgWriteString(this.email);
        writer.write(this.sentCode.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerifiedLogin {
        const args: any = {};
        const _email = reader.tgReadString();
        args.email = _email;
        const _sentCode = reader.tgReadObject();
        args.sentCode = _sentCode;
        return new EmailVerifiedLogin(args);
    }
}