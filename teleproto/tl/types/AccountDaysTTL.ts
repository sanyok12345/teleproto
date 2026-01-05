import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class AccountDaysTTL extends TLObject {
    static CONSTRUCTOR_ID = 3100684255;
    static SUBCLASS_OF_ID = 3131284872;
    static className = "AccountDaysTTL";
    static classType = "constructor";

    days!: number;

    constructor(args: { days?: number } = {}) {
        super();
        this.days = args.days!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3100684255, false);
        writer.writeInt(this.days);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AccountDaysTTL {
        const args: any = {};
        const _days = reader.readInt();
        args.days = _days;
        return new AccountDaysTTL(args);
    }
}