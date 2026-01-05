import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class EmailVerified extends TLObject {
    static CONSTRUCTOR_ID = 731303195;
    static SUBCLASS_OF_ID = 1686319496;
    static className = "account.EmailVerified";
    static classType = "constructor";

    email!: string;

    constructor(args: { email?: string } = {}) {
        super();
        this.email = args.email!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(731303195, false);
        writer.tgWriteString(this.email);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmailVerified {
        const args: any = {};
        const _email = reader.tgReadString();
        args.email = _email;
        return new EmailVerified(args);
    }
}