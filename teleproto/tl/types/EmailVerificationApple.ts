import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmailVerificationApple extends TLObject {
    static CONSTRUCTOR_ID = 2530243837;
    static SUBCLASS_OF_ID = 606003776;
    static className = "EmailVerificationApple";
    static classType = "constructor";

    token!: string;

    constructor(args: { token?: string } = {}) {
        super();
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2530243837, false);
        writer.tgWriteString(this.token);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerificationApple {
        const args: any = {};
        const _token = reader.tgReadString();
        args.token = _token;
        return new EmailVerificationApple(args);
    }
}