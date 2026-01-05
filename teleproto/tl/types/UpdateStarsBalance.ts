import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class UpdateStarsBalance extends TLObject {
    static CONSTRUCTOR_ID = 1317053305;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateStarsBalance";
    static classType = "constructor";

    balance!: TypeStarsAmount;

    constructor(args: { balance?: TypeStarsAmount } = {}) {
        super();
        this.balance = args.balance!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1317053305, false);
        writer.write(this.balance.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateStarsBalance {
        const args: any = {};
        const _balance = reader.tgReadObject();
        args.balance = _balance;
        return new UpdateStarsBalance(args);
    }
}