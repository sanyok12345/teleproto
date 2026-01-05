import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGift } from "../TypeStarGift";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class StarGifts extends TLObject {
    static CONSTRUCTOR_ID = 785918357;
    static SUBCLASS_OF_ID = 1635309988;
    static className = "payments.StarGifts";
    static classType = "constructor";

    hash!: number;
    gifts!: TypeStarGift[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { hash?: number, gifts?: TypeStarGift[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.hash = args.hash!;
        this.gifts = args.gifts!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(785918357, false);
        writer.writeInt(this.hash);
        writer.writeVector(this.gifts, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGifts {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        const _gifts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.gifts = _gifts;
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
        return new StarGifts(args);
    }
}