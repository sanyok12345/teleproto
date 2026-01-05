import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeRecentMeUrl } from "../TypeRecentMeUrl";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class RecentMeUrls extends TLObject {
    static CONSTRUCTOR_ID = 235081943;
    static SUBCLASS_OF_ID = 4067017847;
    static className = "help.RecentMeUrls";
    static classType = "constructor";

    urls!: TypeRecentMeUrl[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { urls?: TypeRecentMeUrl[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.urls = args.urls!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(235081943, false);
        writer.writeVector(this.urls, (item) => {
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

    static fromReader(reader: BinaryReader): RecentMeUrls {
        const args: any = {};
        const _urls = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.urls = _urls;
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
        return new RecentMeUrls(args);
    }
}