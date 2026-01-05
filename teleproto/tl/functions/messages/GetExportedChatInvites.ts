import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeExportedChatInvites } from "../../types/messages/TypeExportedChatInvites";

export class GetExportedChatInvites extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2729812982;
    static SUBCLASS_OF_ID = 1614624881;
    static className = "messages.GetExportedChatInvites";
    static classType = "request";

    flags?: number;
    revoked?: boolean;
    peer?: EntityLike;
    adminId!: EntityLike;
    offsetDate?: number;
    offsetLink?: string;
    limit!: number;

    constructor(args: { flags?: number, revoked?: boolean, peer?: EntityLike, adminId?: EntityLike, offsetDate?: number, offsetLink?: string, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.revoked = args.revoked;
        this.peer = args.peer;
        this.adminId = args.adminId!;
        this.offsetDate = args.offsetDate;
        this.offsetLink = args.offsetLink;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2729812982, false);
        let flags = 0;
        if (this.revoked) { flags |= 1 << 3; }
        if (this.offsetDate !== undefined && this.offsetDate !== null) { flags |= 1 << 2; }
        if (this.offsetLink !== undefined && this.offsetLink !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.revoked !== undefined && this.revoked !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.write((this.adminId as any).getBytes());
        if (this.offsetDate !== undefined && this.offsetDate !== null) {
            writer.writeInt(this.offsetDate);
        }
        if (this.offsetLink !== undefined && this.offsetLink !== null) {
            writer.tgWriteString(this.offsetLink);
        }
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedChatInvites {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetExportedChatInvites {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 3)) {
            const _revoked = true;
            args.revoked = _revoked;
        } else {
            args.revoked = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _adminId = reader.tgReadObject();
        args.adminId = _adminId;
        if (args.flags & (1 << 2)) {
            const _offsetDate = reader.readInt();
            args.offsetDate = _offsetDate;
        } else {
            args.offsetDate = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _offsetLink = reader.tgReadString();
            args.offsetLink = _offsetLink;
        } else {
            args.offsetLink = undefined;
        }
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetExportedChatInvites(args);
    }
}