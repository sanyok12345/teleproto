import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGiftAuctionState } from "./TypeStarGiftAuctionState";

export class UpdateStarGiftAuctionState extends TLObject {
    static CONSTRUCTOR_ID = 1222788802;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateStarGiftAuctionState";
    static classType = "constructor";

    giftId!: bigint;
    state!: TypeStarGiftAuctionState;

    constructor(args: { giftId?: bigint, state?: TypeStarGiftAuctionState } = {}) {
        super();
        this.giftId = args.giftId!;
        this.state = args.state!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1222788802, false);
        writer.writeLargeInt(this.giftId, 64);
        writer.write(this.state.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateStarGiftAuctionState {
        const args: any = {};
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        const _state = reader.tgReadObject();
        args.state = _state;
        return new UpdateStarGiftAuctionState(args);
    }
}