import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatPhoto } from "./TypeChatPhoto";
import { TypeInputChannel } from "./TypeInputChannel";
import { TypeChatAdminRights } from "./TypeChatAdminRights";
import { TypeChatBannedRights } from "./TypeChatBannedRights";

export class Chat extends TLObject {
    static CONSTRUCTOR_ID = 1103884886;
    static SUBCLASS_OF_ID = 3316604308;
    static className = "Chat";
    static classType = "constructor";

    flags!: number;
    creator?: boolean;
    left?: boolean;
    deactivated?: boolean;
    callActive?: boolean;
    callNotEmpty?: boolean;
    noforwards?: boolean;
    id!: bigint;
    title!: string;
    photo!: TypeChatPhoto;
    participantsCount!: number;
    date!: number;
    version!: number;
    migratedTo?: TypeInputChannel;
    adminRights?: TypeChatAdminRights;
    defaultBannedRights?: TypeChatBannedRights;

    constructor(args: { flags?: number, creator?: boolean, left?: boolean, deactivated?: boolean, callActive?: boolean, callNotEmpty?: boolean, noforwards?: boolean, id?: bigint, title?: string, photo?: TypeChatPhoto, participantsCount?: number, date?: number, version?: number, migratedTo?: TypeInputChannel, adminRights?: TypeChatAdminRights, defaultBannedRights?: TypeChatBannedRights } = {}) {
        super();
        this.flags = args.flags!;
        this.creator = args.creator;
        this.left = args.left;
        this.deactivated = args.deactivated;
        this.callActive = args.callActive;
        this.callNotEmpty = args.callNotEmpty;
        this.noforwards = args.noforwards;
        this.id = args.id!;
        this.title = args.title!;
        this.photo = args.photo!;
        this.participantsCount = args.participantsCount!;
        this.date = args.date!;
        this.version = args.version!;
        this.migratedTo = args.migratedTo;
        this.adminRights = args.adminRights;
        this.defaultBannedRights = args.defaultBannedRights;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1103884886, false);
        let flags = 0;
        if (this.creator) { flags |= 1 << 0; }
        if (this.left) { flags |= 1 << 2; }
        if (this.deactivated) { flags |= 1 << 5; }
        if (this.callActive) { flags |= 1 << 23; }
        if (this.callNotEmpty) { flags |= 1 << 24; }
        if (this.noforwards) { flags |= 1 << 25; }
        if (this.migratedTo !== undefined && this.migratedTo !== null) { flags |= 1 << 6; }
        if (this.adminRights !== undefined && this.adminRights !== null) { flags |= 1 << 14; }
        if (this.defaultBannedRights !== undefined && this.defaultBannedRights !== null) { flags |= 1 << 18; }
        writer.writeInt(flags, false);
        if (this.creator !== undefined && this.creator !== null) {
        }
        if (this.left !== undefined && this.left !== null) {
        }
        if (this.deactivated !== undefined && this.deactivated !== null) {
        }
        if (this.callActive !== undefined && this.callActive !== null) {
        }
        if (this.callNotEmpty !== undefined && this.callNotEmpty !== null) {
        }
        if (this.noforwards !== undefined && this.noforwards !== null) {
        }
        writer.writeLargeInt(this.id, 64);
        writer.tgWriteString(this.title);
        writer.write(this.photo.getBytes());
        writer.writeInt(this.participantsCount);
        writer.writeInt(this.date);
        writer.writeInt(this.version);
        if (this.migratedTo !== undefined && this.migratedTo !== null) {
            writer.write(this.migratedTo.getBytes());
        }
        if (this.adminRights !== undefined && this.adminRights !== null) {
            writer.write(this.adminRights.getBytes());
        }
        if (this.defaultBannedRights !== undefined && this.defaultBannedRights !== null) {
            writer.write(this.defaultBannedRights.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Chat {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _creator = true;
            args.creator = _creator;
        } else {
            args.creator = false;
        }
        if (args.flags & (1 << 2)) {
            const _left = true;
            args.left = _left;
        } else {
            args.left = false;
        }
        if (args.flags & (1 << 5)) {
            const _deactivated = true;
            args.deactivated = _deactivated;
        } else {
            args.deactivated = false;
        }
        if (args.flags & (1 << 23)) {
            const _callActive = true;
            args.callActive = _callActive;
        } else {
            args.callActive = false;
        }
        if (args.flags & (1 << 24)) {
            const _callNotEmpty = true;
            args.callNotEmpty = _callNotEmpty;
        } else {
            args.callNotEmpty = false;
        }
        if (args.flags & (1 << 25)) {
            const _noforwards = true;
            args.noforwards = _noforwards;
        } else {
            args.noforwards = false;
        }
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _title = reader.tgReadString();
        args.title = _title;
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        const _participantsCount = reader.readInt();
        args.participantsCount = _participantsCount;
        const _date = reader.readInt();
        args.date = _date;
        const _version = reader.readInt();
        args.version = _version;
        if (args.flags & (1 << 6)) {
            const _migratedTo = reader.tgReadObject();
            args.migratedTo = _migratedTo;
        } else {
            args.migratedTo = undefined;
        }
        if (args.flags & (1 << 14)) {
            const _adminRights = reader.tgReadObject();
            args.adminRights = _adminRights;
        } else {
            args.adminRights = undefined;
        }
        if (args.flags & (1 << 18)) {
            const _defaultBannedRights = reader.tgReadObject();
            args.defaultBannedRights = _defaultBannedRights;
        } else {
            args.defaultBannedRights = undefined;
        }
        return new Chat(args);
    }
}