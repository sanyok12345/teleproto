import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatAdminWithInvites extends TLObject {
    static CONSTRUCTOR_ID = 4075613987;
    static SUBCLASS_OF_ID = 1348727704;
    static className = "ChatAdminWithInvites";
    static classType = "constructor";

    adminId!: bigint;
    invitesCount!: number;
    revokedInvitesCount!: number;

    constructor(args: { adminId?: bigint, invitesCount?: number, revokedInvitesCount?: number } = {}) {
        super();
        this.adminId = args.adminId!;
        this.invitesCount = args.invitesCount!;
        this.revokedInvitesCount = args.revokedInvitesCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4075613987, false);
        writer.writeLargeInt(this.adminId, 64);
        writer.writeInt(this.invitesCount);
        writer.writeInt(this.revokedInvitesCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatAdminWithInvites {
        const args: any = {};
        const _adminId = reader.readLargeInt(64);
        args.adminId = _adminId;
        const _invitesCount = reader.readInt();
        args.invitesCount = _invitesCount;
        const _revokedInvitesCount = reader.readInt();
        args.revokedInvitesCount = _revokedInvitesCount;
        return new ChatAdminWithInvites(args);
    }
}