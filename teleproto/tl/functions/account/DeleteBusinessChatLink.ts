import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DeleteBusinessChatLink extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1611085428;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.DeleteBusinessChatLink";
    static classType = "request";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1611085428, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteBusinessChatLink {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new DeleteBusinessChatLink(args);
    }
}