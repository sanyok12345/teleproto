import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGiftActiveAuctionState } from "../TypeStarGiftActiveAuctionState";
import { TypeUser } from "../TypeUser";
import { TypeChat } from "../TypeChat";

export class StarGiftActiveAuctions extends TLObject {
    static CONSTRUCTOR_ID = 2935401404;
    static SUBCLASS_OF_ID = 2440941767;
    static className = "payments.StarGiftActiveAuctions";
    static classType = "constructor";

    auctions!: TypeStarGiftActiveAuctionState[];
    users!: TypeUser[];
    chats!: TypeChat[];

    constructor(args: { auctions?: TypeStarGiftActiveAuctionState[], users?: TypeUser[], chats?: TypeChat[] } = {}) {
        super();
        this.auctions = args.auctions!;
        this.users = args.users!;
        this.chats = args.chats!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2935401404, false);
        writer.writeVector(this.auctions, (item) => {
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

    static fromReader(reader: BinaryReader): StarGiftActiveAuctions {
        const args: any = {};
        const _auctions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.auctions = _auctions;
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
        return new StarGiftActiveAuctions(args);
    }
}