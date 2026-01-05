import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputStorePaymentPurpose } from "./TypeInputStorePaymentPurpose";
import { TypePremiumGiftCodeOption } from "./TypePremiumGiftCodeOption";

export class InputInvoicePremiumGiftCode extends TLObject {
    static CONSTRUCTOR_ID = 2560125965;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoicePremiumGiftCode";
    static classType = "constructor";

    purpose!: TypeInputStorePaymentPurpose;
    option!: TypePremiumGiftCodeOption;

    constructor(args: { purpose?: TypeInputStorePaymentPurpose, option?: TypePremiumGiftCodeOption } = {}) {
        super();
        this.purpose = args.purpose!;
        this.option = args.option!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2560125965, false);
        writer.write(this.purpose.getBytes());
        writer.write(this.option.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoicePremiumGiftCode {
        const args: any = {};
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        const _option = reader.tgReadObject();
        args.option = _option;
        return new InputInvoicePremiumGiftCode(args);
    }
}