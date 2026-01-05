import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputSavedStarGift } from "./TypeInputSavedStarGift";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputInvoiceStarGiftTransfer extends TLObject {
    static CONSTRUCTOR_ID = 1247763417;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceStarGiftTransfer";
    static classType = "constructor";

    stargift!: TypeInputSavedStarGift;
    toId!: TypeInputPeer;

    constructor(args: { stargift?: TypeInputSavedStarGift, toId?: TypeInputPeer } = {}) {
        super();
        this.stargift = args.stargift!;
        this.toId = args.toId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1247763417, false);
        writer.write(this.stargift.getBytes());
        writer.write(this.toId.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceStarGiftTransfer {
        const args: any = {};
        const _stargift = reader.tgReadObject();
        args.stargift = _stargift;
        const _toId = reader.tgReadObject();
        args.toId = _toId;
        return new InputInvoiceStarGiftTransfer(args);
    }
}