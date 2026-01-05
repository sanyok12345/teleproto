import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class DeleteRevokedExportedChatInvites extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1452833749;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.DeleteRevokedExportedChatInvites";
    static classType = "request";

    peer?: EntityLike;
    adminId!: EntityLike;

    constructor(args: { peer?: EntityLike, adminId?: EntityLike } = {}) {
        super();
        this.peer = args.peer;
        this.adminId = args.adminId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1452833749, false);
        writer.write((this.peer! as any).getBytes());
        writer.write((this.adminId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteRevokedExportedChatInvites {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _adminId = reader.tgReadObject();
        args.adminId = _adminId;
        return new DeleteRevokedExportedChatInvites(args);
    }
}