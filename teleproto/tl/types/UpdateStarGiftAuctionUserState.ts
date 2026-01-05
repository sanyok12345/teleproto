import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGiftAuctionUserState } from "./TypeStarGiftAuctionUserState";

export class UpdateStarGiftAuctionUserState extends TLObject {
    static CONSTRUCTOR_ID = 3696816926;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateStarGiftAuctionUserState";
    static classType = "constructor";

    giftId!: bigint;
    userState!: TypeStarGiftAuctionUserState;

    constructor(args: { giftId?: bigint, userState?: TypeStarGiftAuctionUserState } = {}) {
        super();
        this.giftId = args.giftId!;
        this.userState = args.userState!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3696816926, false);
        writer.writeLargeInt(this.giftId, 64);
        writer.write(this.userState.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateStarGiftAuctionUserState {
        const args: any = {};
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        const _userState = reader.tgReadObject();
        args.userState = _userState;
        return new UpdateStarGiftAuctionUserState(args);
    }
}