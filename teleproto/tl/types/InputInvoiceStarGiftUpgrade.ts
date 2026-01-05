import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputSavedStarGift } from "./TypeInputSavedStarGift";

export class InputInvoiceStarGiftUpgrade extends TLObject {
    static CONSTRUCTOR_ID = 1300335965;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceStarGiftUpgrade";
    static classType = "constructor";

    flags!: number;
    keepOriginalDetails?: boolean;
    stargift!: TypeInputSavedStarGift;

    constructor(args: { flags?: number, keepOriginalDetails?: boolean, stargift?: TypeInputSavedStarGift } = {}) {
        super();
        this.flags = args.flags!;
        this.keepOriginalDetails = args.keepOriginalDetails;
        this.stargift = args.stargift!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1300335965, false);
        let flags = 0;
        if (this.keepOriginalDetails) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.keepOriginalDetails !== undefined && this.keepOriginalDetails !== null) {
        }
        writer.write(this.stargift.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceStarGiftUpgrade {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _keepOriginalDetails = true;
            args.keepOriginalDetails = _keepOriginalDetails;
        } else {
            args.keepOriginalDetails = false;
        }
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        return new InputInvoiceStarGiftUpgrade(args);
    }
}