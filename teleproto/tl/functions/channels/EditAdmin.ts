import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatAdminRights } from "../../types/TypeChatAdminRights";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditAdmin extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3543959810;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.EditAdmin";
    static classType = "request";

    channel?: EntityLike;
    userId!: EntityLike;
    adminRights!: TypeChatAdminRights;
    rank!: string;

    constructor(args: { channel?: EntityLike, userId?: EntityLike, adminRights?: TypeChatAdminRights, rank?: string } = {}) {
        super();
        this.channel = args.channel;
        this.userId = args.userId!;
        this.adminRights = args.adminRights!;
        this.rank = args.rank!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3543959810, false);
        writer.write((this.channel! as any).getBytes());
        writer.write((this.userId as any).getBytes());
        writer.write(this.adminRights.getBytes());
        writer.tgWriteString(this.rank);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditAdmin {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _adminRights = reader.tgReadObject();
        args.adminRights = _adminRights;
        const _rank = reader.tgReadString();
        args.rank = _rank;
        return new EditAdmin(args);
    }
}