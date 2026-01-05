import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeChannelAdminLogEvent } from "../TypeChannelAdminLogEvent";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class AdminLogResults extends TLObject {
    static CONSTRUCTOR_ID = 3985307469;
    static SUBCLASS_OF_ID = 1374713532;
    static className = "channels.AdminLogResults";
    static classType = "constructor";

    events!: TypeChannelAdminLogEvent[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { events?: TypeChannelAdminLogEvent[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.events = args.events!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3985307469, false);
        writer.writeVector(this.events, (item) => {
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

    static fromReader(reader: BinaryReader): AdminLogResults {
        const args: any = {};
        const _events = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.events = _events;
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
        return new AdminLogResults(args);
    }
}