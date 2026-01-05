import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeExportedChatInvite } from "../../types/messages/TypeExportedChatInvite";

export class EditExportedChatInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3184144245;
    static SUBCLASS_OF_ID = 2195510474;
    static className = "messages.EditExportedChatInvite";
    static classType = "request";

    flags?: number;
    revoked?: boolean;
    peer?: EntityLike;
    link!: string;
    expireDate?: number;
    usageLimit?: number;
    requestNeeded?: boolean;
    title?: string;

    constructor(args: { flags?: number, revoked?: boolean, peer?: EntityLike, link?: string, expireDate?: number, usageLimit?: number, requestNeeded?: boolean, title?: string } = {}) {
        super();
        this.flags = args.flags;
        this.revoked = args.revoked;
        this.peer = args.peer;
        this.link = args.link!;
        this.expireDate = args.expireDate;
        this.usageLimit = args.usageLimit;
        this.requestNeeded = args.requestNeeded;
        this.title = args.title;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3184144245, false);
        let flags = 0;
        if (this.revoked) { flags |= 1 << 2; }
        if (this.expireDate !== undefined && this.expireDate !== null) { flags |= 1 << 0; }
        if (this.usageLimit !== undefined && this.usageLimit !== null) { flags |= 1 << 1; }
        if (this.requestNeeded !== undefined && this.requestNeeded !== null) { flags |= 1 << 3; }
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.revoked !== undefined && this.revoked !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.link);
        if (this.expireDate !== undefined && this.expireDate !== null) {
            writer.writeInt(this.expireDate);
        }
        if (this.usageLimit !== undefined && this.usageLimit !== null) {
            writer.writeInt(this.usageLimit);
        }
        if (this.requestNeeded !== undefined && this.requestNeeded !== null) {
            writer.tgWriteBool(this.requestNeeded);
        }
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedChatInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditExportedChatInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 2)) {
            const _revoked = true;
            args.revoked = _revoked;
        } else {
            args.revoked = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _link = reader.tgReadString();
        args.link = _link;
        if (args.flags & (1 << 0)) {
            const _expireDate = reader.readInt();
            args.expireDate = _expireDate;
        } else {
            args.expireDate = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _usageLimit = reader.readInt();
            args.usageLimit = _usageLimit;
        } else {
            args.usageLimit = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _requestNeeded = reader.tgReadBool();
            args.requestNeeded = _requestNeeded;
        } else {
            args.requestNeeded = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        return new EditExportedChatInvite(args);
    }
}