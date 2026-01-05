import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeMyBoost } from "../TypeMyBoost";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class MyBoosts extends TLObject {
    static CONSTRUCTOR_ID = 2598512866;
    static SUBCLASS_OF_ID = 2905936603;
    static className = "premium.MyBoosts";
    static classType = "constructor";

    myBoosts!: TypeMyBoost[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { myBoosts?: TypeMyBoost[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.myBoosts = args.myBoosts!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2598512866, false);
        writer.writeVector(this.myBoosts, (item) => {
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

    static fromReader(reader: BinaryReader): MyBoosts {
        const args: any = {};
        const _myBoosts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.myBoosts = _myBoosts;
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
        return new MyBoosts(args);
    }
}