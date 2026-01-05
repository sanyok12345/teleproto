import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatAdminRights } from "./TypeChatAdminRights";

export class ChannelParticipantAdmin extends TLObject {
    static CONSTRUCTOR_ID = 885242707;
    static SUBCLASS_OF_ID = 3653762072;
    static className = "ChannelParticipantAdmin";
    static classType = "constructor";

    flags!: number;
    canEdit?: boolean;
    self?: boolean;
    userId!: bigint;
    inviterId?: bigint;
    promotedBy!: bigint;
    date!: number;
    adminRights!: TypeChatAdminRights;
    rank?: string;

    constructor(args: { flags?: number, canEdit?: boolean, self?: boolean, userId?: bigint, inviterId?: bigint, promotedBy?: bigint, date?: number, adminRights?: TypeChatAdminRights, rank?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.canEdit = args.canEdit;
        this.self = args.self;
        this.userId = args.userId!;
        this.inviterId = args.inviterId;
        this.promotedBy = args.promotedBy!;
        this.date = args.date!;
        this.adminRights = args.adminRights!;
        this.rank = args.rank;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(885242707, false);
        let flags = 0;
        if (this.canEdit) { flags |= 1 << 0; }
        if (this.self) { flags |= 1 << 1; }
        if (this.inviterId !== undefined && this.inviterId !== null) { flags |= 1 << 1; }
        if (this.rank !== undefined && this.rank !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.canEdit !== undefined && this.canEdit !== null) {
        }
        if (this.self !== undefined && this.self !== null) {
        }
        writer.writeLargeInt(this.userId, 64);
        if (this.inviterId !== undefined && this.inviterId !== null) {
            writer.writeLargeInt(this.inviterId, 64);
        }
        writer.writeLargeInt(this.promotedBy, 64);
        writer.writeInt(this.date);
        writer.write(this.adminRights.getBytes());
        if (this.rank !== undefined && this.rank !== null) {
            writer.tgWriteString(this.rank);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantAdmin {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _canEdit = true;
            args.canEdit = _canEdit;
        } else {
            args.canEdit = false;
        }
        if (args.flags & (1 << 1)) {
            const _self = true;
            args.self = _self;
        } else {
            args.self = false;
        }
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        if (args.flags & (1 << 1)) {
            const _inviterId = reader.readLargeInt(64);
            args.inviterId = _inviterId;
        } else {
            args.inviterId = undefined;
        }
        const _promotedBy = reader.readLargeInt(64);
        args.promotedBy = _promotedBy;
        const _date = reader.readInt();
        args.date = _date;
        const _adminRights = reader.tgReadObject();
        args.adminRights = _adminRights;
        if (args.flags & (1 << 2)) {
            const _rank = reader.tgReadString();
            args.rank = _rank;
        } else {
            args.rank = undefined;
        }
        return new ChannelParticipantAdmin(args);
    }
}