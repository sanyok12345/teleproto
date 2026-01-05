import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputPaymentCredentialsSaved extends TLObject {
    static CONSTRUCTOR_ID = 3238965967;
    static SUBCLASS_OF_ID = 681157949;
    static className = "InputPaymentCredentialsSaved";
    static classType = "constructor";

    id!: string;
    tmpPassword!: Buffer;

    constructor(args: { id?: string, tmpPassword?: Buffer } = {}) {
        super();
        this.id = args.id!;
        this.tmpPassword = args.tmpPassword!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3238965967, false);
        writer.tgWriteString(this.id);
        writer.tgWriteBytes(this.tmpPassword);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPaymentCredentialsSaved {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _tmpPassword = reader.tgReadBytes();
        args.tmpPassword = _tmpPassword;
        return new InputPaymentCredentialsSaved(args);
    }
}