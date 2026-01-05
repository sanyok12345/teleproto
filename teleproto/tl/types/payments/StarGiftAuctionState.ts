import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGift } from "../TypeStarGift";
import { TypeStarGiftAuctionState } from "../TypeStarGiftAuctionState";
import { TypeStarGiftAuctionUserState } from "../TypeStarGiftAuctionUserState";
import { TypeUser } from "../TypeUser";
import { TypeChat } from "../TypeChat";

export class StarGiftAuctionState extends TLObject {
    static CONSTRUCTOR_ID = 1798960364;
    static SUBCLASS_OF_ID = 439453081;
    static className = "payments.StarGiftAuctionState";
    static classType = "constructor";

    gift!: TypeStarGift;
    state!: TypeStarGiftAuctionState;
    userState!: TypeStarGiftAuctionUserState;
    timeout!: number;
    users!: TypeUser[];
    chats!: TypeChat[];

    constructor(args: { gift?: TypeStarGift, state?: TypeStarGiftAuctionState, userState?: TypeStarGiftAuctionUserState, timeout?: number, users?: TypeUser[], chats?: TypeChat[] } = {}) {
        super();
        this.gift = args.gift!;
        this.state = args.state!;
        this.userState = args.userState!;
        this.timeout = args.timeout!;
        this.users = args.users!;
        this.chats = args.chats!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1798960364, false);
        writer.write(this.gift.getBytes());
        writer.write(this.state.getBytes());
        writer.write(this.userState.getBytes());
        writer.writeInt(this.timeout);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionState {
        const args: any = {};
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        const _state = reader.tgReadObject();
        args.state = _state;
        const _userState = reader.tgReadObject();
        args.userState = _userState;
        const _timeout = reader.readInt();
        args.timeout = _timeout;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        return new StarGiftAuctionState(args);
    }
}