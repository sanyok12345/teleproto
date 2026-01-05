import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStorePaymentPurpose } from "./TypeInputStorePaymentPurpose";

export class InputInvoicePremiumAuthCode extends TLObject {
    static CONSTRUCTOR_ID = 1048049172;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoicePremiumAuthCode";
    static classType = "constructor";

    purpose!: TypeInputStorePaymentPurpose;

    constructor(args: { purpose?: TypeInputStorePaymentPurpose } = {}) {
        super();
        this.purpose = args.purpose!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1048049172, false);
        writer.write(this.purpose.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoicePremiumAuthCode {
        const args: any = {};
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        return new InputInvoicePremiumAuthCode(args);
    }
}