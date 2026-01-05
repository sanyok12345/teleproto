import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class PaidMessagesRevenue extends TLObject {
    static CONSTRUCTOR_ID = 504403720;
    static SUBCLASS_OF_ID = 355404887;
    static className = "account.PaidMessagesRevenue";
    static classType = "constructor";

    starsAmount!: bigint;

    constructor(args: { starsAmount?: bigint } = {}) {
        super();
        this.starsAmount = args.starsAmount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(504403720, false);
        writer.writeLargeInt(this.starsAmount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaidMessagesRevenue {
        const args: any = {};
        const _starsAmount = reader.readLargeInt(64);
        args.starsAmount = _starsAmount;
        return new PaidMessagesRevenue(args);
    }
}