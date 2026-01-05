import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeExportedChatInvite } from "../../types/messages/TypeExportedChatInvite";

export class GetExportedChatInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1937010524;
    static SUBCLASS_OF_ID = 2195510474;
    static className = "messages.GetExportedChatInvite";
    static classType = "request";

    peer?: EntityLike;
    link!: string;

    constructor(args: { peer?: EntityLike, link?: string } = {}) {
        super();
        this.peer = args.peer;
        this.link = args.link!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1937010524, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.link);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedChatInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetExportedChatInvite {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _link = reader.tgReadString();
        args.link = _link;
        return new GetExportedChatInvite(args);
    }
}