import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypePeerSettings } from "../TypePeerSettings";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class PeerSettings extends TLObject {
    static CONSTRUCTOR_ID = 1753266509;
    static SUBCLASS_OF_ID = 1705179041;
    static className = "messages.PeerSettings";
    static classType = "constructor";

    settings!: TypePeerSettings;
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { settings?: TypePeerSettings, chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.settings = args.settings!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1753266509, false);
        writer.write(this.settings.getBytes());
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerSettings {
        const args: any = {};
        const _settings = reader.tgReadObject();
        args.settings = _settings;
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
        return new PeerSettings(args);
    }
}