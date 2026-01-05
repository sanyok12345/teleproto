import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGiftAuctionAcquiredGift } from "../TypeStarGiftAuctionAcquiredGift";
import { TypeUser } from "../TypeUser";
import { TypeChat } from "../TypeChat";

export class StarGiftAuctionAcquiredGifts extends TLObject {
    static CONSTRUCTOR_ID = 2103169520;
    static SUBCLASS_OF_ID = 2802321947;
    static className = "payments.StarGiftAuctionAcquiredGifts";
    static classType = "constructor";

    gifts!: TypeStarGiftAuctionAcquiredGift[];
    users!: TypeUser[];
    chats!: TypeChat[];

    constructor(args: { gifts?: TypeStarGiftAuctionAcquiredGift[], users?: TypeUser[], chats?: TypeChat[] } = {}) {
        super();
        this.gifts = args.gifts!;
        this.users = args.users!;
        this.chats = args.chats!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2103169520, false);
        writer.writeVector(this.gifts, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftAuctionAcquiredGifts {
        const args: any = {};
        const _gifts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.gifts = _gifts;
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
        return new StarGiftAuctionAcquiredGifts(args);
    }
}