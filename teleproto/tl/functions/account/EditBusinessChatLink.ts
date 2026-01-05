import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBusinessChatLink } from "../../types/TypeInputBusinessChatLink";
import { TypeBusinessChatLink } from "../../types/TypeBusinessChatLink";

export class EditBusinessChatLink extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2352222383;
    static SUBCLASS_OF_ID = 1007504011;
    static className = "account.EditBusinessChatLink";
    static classType = "request";

    slug!: string;
    link!: TypeInputBusinessChatLink;

    constructor(args: { slug?: string, link?: TypeInputBusinessChatLink } = {}) {
        super();
        this.slug = args.slug!;
        this.link = args.link!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2352222383, false);
        writer.tgWriteString(this.slug);
        writer.write(this.link.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBusinessChatLink {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditBusinessChatLink {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _link = reader.tgReadObject();
        args.link = _link;
        return new EditBusinessChatLink(args);
    }
}