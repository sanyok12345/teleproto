import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatInviteImporters } from "../../types/messages/TypeChatInviteImporters";

export class GetChatInviteImporters extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3741637966;
    static SUBCLASS_OF_ID = 3653012134;
    static className = "messages.GetChatInviteImporters";
    static classType = "request";

    flags?: number;
    requested?: boolean;
    subscriptionExpired?: boolean;
    peer?: EntityLike;
    link?: string;
    q?: string;
    offsetDate!: number;
    offsetUser!: EntityLike;
    limit!: number;

    constructor(args: { flags?: number, requested?: boolean, subscriptionExpired?: boolean, peer?: EntityLike, link?: string, q?: string, offsetDate?: number, offsetUser?: EntityLike, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.requested = args.requested;
        this.subscriptionExpired = args.subscriptionExpired;
        this.peer = args.peer;
        this.link = args.link;
        this.q = args.q;
        this.offsetDate = args.offsetDate!;
        this.offsetUser = args.offsetUser!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3741637966, false);
        let flags = 0;
        if (this.requested) { flags |= 1 << 0; }
        if (this.subscriptionExpired) { flags |= 1 << 3; }
        if (this.link !== undefined && this.link !== null) { flags |= 1 << 1; }
        if (this.q !== undefined && this.q !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.requested !== undefined && this.requested !== null) {
        }
        if (this.subscriptionExpired !== undefined && this.subscriptionExpired !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        if (this.link !== undefined && this.link !== null) {
            writer.tgWriteString(this.link);
        }
        if (this.q !== undefined && this.q !== null) {
            writer.tgWriteString(this.q);
        }
        writer.writeInt(this.offsetDate);
        writer.write((this.offsetUser as any).getBytes());
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatInviteImporters {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetChatInviteImporters {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _requested = true;
            args.requested = _requested;
        } else {
            args.requested = false;
        }
        if (args.flags & (1 << 3)) {
            const _subscriptionExpired = true;
            args.subscriptionExpired = _subscriptionExpired;
        } else {
            args.subscriptionExpired = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 1)) {
            const _link = reader.tgReadString();
            args.link = _link;
        } else {
            args.link = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _q = reader.tgReadString();
            args.q = _q;
        } else {
            args.q = undefined;
        }
        const _offsetDate = reader.readInt();
        args.offsetDate = _offsetDate;
        const _offsetUser = reader.tgReadObject();
        args.offsetUser = _offsetUser;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetChatInviteImporters(args);
    }
}