import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PasswordRecovery extends TLObject {
    static CONSTRUCTOR_ID = 326715557;
    static SUBCLASS_OF_ID = 4201829434;
    static className = "auth.PasswordRecovery";
    static classType = "constructor";

    emailPattern!: string;

    constructor(args: { emailPattern?: string } = {}) {
        super();
        this.emailPattern = args.emailPattern!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(326715557, false);
        writer.tgWriteString(this.emailPattern);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PasswordRecovery {
        const args: any = {};
        const _emailPattern = reader.tgReadString();
        args.emailPattern = _emailPattern;
        return new PasswordRecovery(args);
    }
}