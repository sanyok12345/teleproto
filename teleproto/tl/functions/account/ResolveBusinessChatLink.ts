import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeResolvedBusinessChatLinks } from "../../types/account/TypeResolvedBusinessChatLinks";

export class ResolveBusinessChatLink extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1418913262;
    static SUBCLASS_OF_ID = 980888616;
    static className = "account.ResolveBusinessChatLink";
    static classType = "request";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1418913262, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeResolvedBusinessChatLinks {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResolveBusinessChatLink {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new ResolveBusinessChatLink(args);
    }
}