import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatBannedRights } from "../../types/TypeChatBannedRights";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditBanned extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2531708289;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.EditBanned";
    static classType = "request";

    channel?: EntityLike;
    participant!: EntityLike;
    bannedRights!: TypeChatBannedRights;

    constructor(args: { channel?: EntityLike, participant?: EntityLike, bannedRights?: TypeChatBannedRights } = {}) {
        super();
        this.channel = args.channel;
        this.participant = args.participant!;
        this.bannedRights = args.bannedRights!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2531708289, false);
        writer.write((this.channel! as any).getBytes());
        writer.write((this.participant as any).getBytes());
        writer.write(this.bannedRights.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditBanned {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _participant = reader.tgReadObject();
        args.participant = _participant;
        const _bannedRights = reader.tgReadObject();
        args.bannedRights = _bannedRights;
        return new EditBanned(args);
    }
}