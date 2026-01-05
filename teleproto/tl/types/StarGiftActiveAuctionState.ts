import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarGift } from "./TypeStarGift";
import { TypeStarGiftAuctionState } from "./TypeStarGiftAuctionState";
import { TypeStarGiftAuctionUserState } from "./TypeStarGiftAuctionUserState";

export class StarGiftActiveAuctionState extends TLObject {
    static CONSTRUCTOR_ID = 3541812317;
    static SUBCLASS_OF_ID = 3109811689;
    static className = "StarGiftActiveAuctionState";
    static classType = "constructor";

    gift!: TypeStarGift;
    state!: TypeStarGiftAuctionState;
    userState!: TypeStarGiftAuctionUserState;

    constructor(args: { gift?: TypeStarGift, state?: TypeStarGiftAuctionState, userState?: TypeStarGiftAuctionUserState } = {}) {
        super();
        this.gift = args.gift!;
        this.state = args.state!;
        this.userState = args.userState!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3541812317, false);
        writer.write(this.gift.getBytes());
        writer.write(this.state.getBytes());
        writer.write(this.userState.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftActiveAuctionState {
        const args: any = {};
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        const _state = reader.tgReadObject();
        args.state = _state;
        const _userState = reader.tgReadObject();
        args.userState = _userState;
        return new StarGiftActiveAuctionState(args);
    }
}