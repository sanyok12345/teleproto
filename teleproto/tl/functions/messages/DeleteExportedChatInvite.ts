import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class DeleteExportedChatInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3563365419;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.DeleteExportedChatInvite";
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
        writer.writeInt(3563365419, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.link);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteExportedChatInvite {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _link = reader.tgReadString();
        args.link = _link;
        return new DeleteExportedChatInvite(args);
    }
}