import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDataJSON } from "./TypeDataJSON";

export class InputPaymentCredentialsGooglePay extends TLObject {
    static CONSTRUCTOR_ID = 2328045569;
    static SUBCLASS_OF_ID = 681157949;
    static className = "InputPaymentCredentialsGooglePay";
    static classType = "constructor";

    paymentToken!: TypeDataJSON;

    constructor(args: { paymentToken?: TypeDataJSON } = {}) {
        super();
        this.paymentToken = args.paymentToken!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2328045569, false);
        writer.write(this.paymentToken.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputPaymentCredentialsGooglePay {
        const args: any = {};
        const _paymentToken = reader.tgReadObject();
        args.paymentToken = _paymentToken;
        return new InputPaymentCredentialsGooglePay(args);
    }
}