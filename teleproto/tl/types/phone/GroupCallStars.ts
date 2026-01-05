import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeGroupCallDonor } from "../TypeGroupCallDonor";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class GroupCallStars extends TLObject {
    static CONSTRUCTOR_ID = 2635971878;
    static SUBCLASS_OF_ID = 3024584730;
    static className = "phone.GroupCallStars";
    static classType = "constructor";

    totalStars!: bigint;
    topDonors!: TypeGroupCallDonor[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { totalStars?: bigint, topDonors?: TypeGroupCallDonor[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.totalStars = args.totalStars!;
        this.topDonors = args.topDonors!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2635971878, false);
        writer.writeLargeInt(this.totalStars, 64);
        writer.writeVector(this.topDonors, (item) => {
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

    static fromReader(reader: BinaryReader): GroupCallStars {
        const args: any = {};
        const _totalStars = reader.readLargeInt(64);
        args.totalStars = _totalStars;
        const _topDonors = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.topDonors = _topDonors;
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
        return new GroupCallStars(args);
    }
}