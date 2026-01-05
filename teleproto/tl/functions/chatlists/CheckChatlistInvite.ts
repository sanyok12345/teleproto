import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChatlistInvite } from "../../types/chatlists/TypeChatlistInvite";

export class CheckChatlistInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1103171583;
    static SUBCLASS_OF_ID = 1097993845;
    static className = "chatlists.CheckChatlistInvite";
    static classType = "request";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1103171583, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatlistInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckChatlistInvite {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new CheckChatlistInvite(args);
    }
}