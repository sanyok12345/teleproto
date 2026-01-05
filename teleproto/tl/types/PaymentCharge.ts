import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PaymentCharge extends TLObject {
    static CONSTRUCTOR_ID = 3926049406;
    static SUBCLASS_OF_ID = 1019752665;
    static className = "PaymentCharge";
    static classType = "constructor";

    id!: string;
    providerChargeId!: string;

    constructor(args: { id?: string, providerChargeId?: string } = {}) {
        super();
        this.id = args.id!;
        this.providerChargeId = args.providerChargeId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3926049406, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.providerChargeId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PaymentCharge {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _providerChargeId = reader.tgReadString();
        args.providerChargeId = _providerChargeId;
        return new PaymentCharge(args);
    }
}