import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class EmailVerificationGoogle extends TLObject {
    static CONSTRUCTOR_ID = 3683688130;
    static SUBCLASS_OF_ID = 606003776;
    static className = "EmailVerificationGoogle";
    static classType = "constructor";

    token!: string;

    constructor(args: { token?: string } = {}) {
        super();
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3683688130, false);
        writer.tgWriteString(this.token);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerificationGoogle {
        const args: any = {};
        const _token = reader.tgReadString();
        args.token = _token;
        return new EmailVerificationGoogle(args);
    }
}