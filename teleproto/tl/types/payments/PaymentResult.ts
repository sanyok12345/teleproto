import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeUpdates } from "../TypeUpdates";

export class PaymentResult extends TLObject {
    static CONSTRUCTOR_ID = 1314881805;
    static SUBCLASS_OF_ID = 2330028701;
    static className = "payments.PaymentResult";
    static classType = "constructor";

    updates!: TypeUpdates;

    constructor(args: { updates?: TypeUpdates } = {}) {
        super();
        this.updates = args.updates!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1314881805, false);
        writer.write(this.updates.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentResult {
        const args: any = {};
        const _updates = reader.tgReadObject();
        args.updates = _updates;
        return new PaymentResult(args);
    }
}