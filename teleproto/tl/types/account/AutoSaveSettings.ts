import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAutoSaveSettings } from "../TypeAutoSaveSettings";
import { TypeAutoSaveException } from "../TypeAutoSaveException";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class AutoSaveSettings extends TLObject {
    static CONSTRUCTOR_ID = 1279133341;
    static SUBCLASS_OF_ID = 1221537538;
    static className = "account.AutoSaveSettings";
    static classType = "constructor";

    usersSettings!: TypeAutoSaveSettings;
    chatsSettings!: TypeAutoSaveSettings;
    broadcastsSettings!: TypeAutoSaveSettings;
    exceptions!: TypeAutoSaveException[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { usersSettings?: TypeAutoSaveSettings, chatsSettings?: TypeAutoSaveSettings, broadcastsSettings?: TypeAutoSaveSettings, exceptions?: TypeAutoSaveException[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.usersSettings = args.usersSettings!;
        this.chatsSettings = args.chatsSettings!;
        this.broadcastsSettings = args.broadcastsSettings!;
        this.exceptions = args.exceptions!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1279133341, false);
        writer.write(this.usersSettings.getBytes());
        writer.write(this.chatsSettings.getBytes());
        writer.write(this.broadcastsSettings.getBytes());
        writer.writeVector(this.exceptions, (item) => {
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

    static fromReader(reader: BinaryReader): AutoSaveSettings {
        const args: any = {};
        const _usersSettings = reader.tgReadObject();
        args.usersSettings = _usersSettings;
        const _chatsSettings = reader.tgReadObject();
        args.chatsSettings = _chatsSettings;
        const _broadcastsSettings = reader.tgReadObject();
        args.broadcastsSettings = _broadcastsSettings;
        const _exceptions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.exceptions = _exceptions;
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
        return new AutoSaveSettings(args);
    }
}