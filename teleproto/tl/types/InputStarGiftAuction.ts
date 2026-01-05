import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStarGiftAuction extends TLObject {
    static CONSTRUCTOR_ID = 48327832;
    static SUBCLASS_OF_ID = 1101130410;
    static className = "InputStarGiftAuction";
    static classType = "constructor";

    giftId!: bigint;

    constructor(args: { giftId?: bigint } = {}) {
        super();
        this.giftId = args.giftId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(48327832, false);
        writer.writeLargeInt(this.giftId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStarGiftAuction {
        const args: any = {};
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        return new InputStarGiftAuction(args);
    }
}