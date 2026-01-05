import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGift } from "../TypeStarGift";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class UniqueStarGift extends TLObject {
    static CONSTRUCTOR_ID = 1097619176;
    static SUBCLASS_OF_ID = 2024850939;
    static className = "payments.UniqueStarGift";
    static classType = "constructor";

    gift!: TypeStarGift;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { gift?: TypeStarGift, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.gift = args.gift!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1097619176, false);
        writer.write(this.gift.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UniqueStarGift {
        const args: any = {};
        const _gift = reader.tgReadObject();
        args.gift = _gift;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new UniqueStarGift(args);
    }
}