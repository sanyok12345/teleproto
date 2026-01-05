import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class InputPaymentCredentialsApplePay extends TLObject {
    static CONSTRUCTOR_ID = 178373535;
    static SUBCLASS_OF_ID = 681157949;
    static className = "InputPaymentCredentialsApplePay";
    static classType = "constructor";

    paymentData!: TypeDataJSON;

    constructor(args: { paymentData?: TypeDataJSON } = {}) {
        super();
        this.paymentData = args.paymentData!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(178373535, false);
        writer.write(this.paymentData.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPaymentCredentialsApplePay {
        const args: any = {};
        const _paymentData = reader.tgReadObject();
        args.paymentData = _paymentData;
        return new InputPaymentCredentialsApplePay(args);
    }
}