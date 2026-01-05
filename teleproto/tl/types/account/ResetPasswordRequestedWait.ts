import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class ResetPasswordRequestedWait extends TLObject {
    static CONSTRUCTOR_ID = 3924819069;
    static SUBCLASS_OF_ID = 1230009366;
    static className = "account.ResetPasswordRequestedWait";
    static classType = "constructor";

    untilDate!: number;

    constructor(args: { untilDate?: number } = {}) {
        super();
        this.untilDate = args.untilDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3924819069, false);
        writer.writeInt(this.untilDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ResetPasswordRequestedWait {
        const args: any = {};
        const _untilDate = reader.readInt();
        args.untilDate = _untilDate;
        return new ResetPasswordRequestedWait(args);
    }
}