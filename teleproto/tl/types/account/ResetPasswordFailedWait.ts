import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ResetPasswordFailedWait extends TLObject {
    static CONSTRUCTOR_ID = 3816265825;
    static SUBCLASS_OF_ID = 1230009366;
    static className = "account.ResetPasswordFailedWait";
    static classType = "constructor";

    retryDate!: number;

    constructor(args: { retryDate?: number } = {}) {
        super();
        this.retryDate = args.retryDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3816265825, false);
        writer.writeInt(this.retryDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ResetPasswordFailedWait {
        const args: any = {};
        const _retryDate = reader.readInt();
        args.retryDate = _retryDate;
        return new ResetPasswordFailedWait(args);
    }
}