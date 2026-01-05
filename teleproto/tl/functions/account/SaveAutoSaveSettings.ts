import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeAutoSaveSettings } from "../../types/TypeAutoSaveSettings";

export class SaveAutoSaveSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3600515937;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SaveAutoSaveSettings";
    static classType = "request";

    flags?: number;
    users?: boolean;
    chats?: boolean;
    broadcasts?: boolean;
    peer?: EntityLike;
    settings!: TypeAutoSaveSettings;

    constructor(args: { flags?: number, users?: boolean, chats?: boolean, broadcasts?: boolean, peer?: EntityLike, settings?: TypeAutoSaveSettings } = {}) {
        super();
        this.flags = args.flags;
        this.users = args.users;
        this.chats = args.chats;
        this.broadcasts = args.broadcasts;
        this.peer = args.peer;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3600515937, false);
        let flags = 0;
        if (this.users) { flags |= 1 << 0; }
        if (this.chats) { flags |= 1 << 1; }
        if (this.broadcasts) { flags |= 1 << 2; }
        if (this.peer !== undefined && this.peer !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.users !== undefined && this.users !== null) {
        }
        if (this.chats !== undefined && this.chats !== null) {
        }
        if (this.broadcasts !== undefined && this.broadcasts !== null) {
        }
        if (this.peer !== undefined && this.peer !== null) {
            writer.write((this.peer as any).getBytes());
        }
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveAutoSaveSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _users = true;
            args.users = _users;
        } else {
            args.users = false;
        }
        if (args.flags & (1 << 1)) {
            const _chats = true;
            args.chats = _chats;
        } else {
            args.chats = false;
        }
        if (args.flags & (1 << 2)) {
            const _broadcasts = true;
            args.broadcasts = _broadcasts;
        } else {
            args.broadcasts = false;
        }
        if (args.flags & (1 << 3)) {
            const _peer = reader.tgReadObject();
            args.peer = _peer;
        } else {
            args.peer = undefined;
        }
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new SaveAutoSaveSettings(args);
    }
}