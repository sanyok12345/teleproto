import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeChatBannedRights } from "../../types/TypeChatBannedRights";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditChatDefaultBannedRights extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2777049921;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.EditChatDefaultBannedRights";
    static classType = "request";

    peer?: EntityLike;
    bannedRights!: TypeChatBannedRights;

    constructor(args: { peer?: EntityLike, bannedRights?: TypeChatBannedRights } = {}) {
        super();
        this.peer = args.peer;
        this.bannedRights = args.bannedRights!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2777049921, false);
        writer.write((this.peer! as any).getBytes());
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

    static fromReader(reader: BinaryReader): EditChatDefaultBannedRights {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _bannedRights = reader.tgReadObject();
        args.bannedRights = _bannedRights;
        return new EditChatDefaultBannedRights(args);
    }
}