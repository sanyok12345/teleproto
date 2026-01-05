import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmailVerificationCode extends TLObject {
    static CONSTRUCTOR_ID = 2452510121;
    static SUBCLASS_OF_ID = 606003776;
    static className = "EmailVerificationCode";
    static classType = "constructor";

    code!: string;

    constructor(args: { code?: string } = {}) {
        super();
        this.code = args.code!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2452510121, false);
        writer.tgWriteString(this.code);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerificationCode {
        const args: any = {};
        const _code = reader.tgReadString();
        args.code = _code;
        return new EmailVerificationCode(args);
    }
}