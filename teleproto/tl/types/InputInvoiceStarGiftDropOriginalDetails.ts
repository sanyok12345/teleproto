import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputSavedStarGift } from "./TypeInputSavedStarGift";

export class InputInvoiceStarGiftDropOriginalDetails extends TLObject {
    static CONSTRUCTOR_ID = 153344209;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceStarGiftDropOriginalDetails";
    static classType = "constructor";

    stargift!: TypeInputSavedStarGift;

    constructor(args: { stargift?: TypeInputSavedStarGift } = {}) {
        super();
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(153344209, false);
        writer.write(this.stargift.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceStarGiftDropOriginalDetails {
        const args: any = {};
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        return new InputInvoiceStarGiftDropOriginalDetails(args);
    }
}