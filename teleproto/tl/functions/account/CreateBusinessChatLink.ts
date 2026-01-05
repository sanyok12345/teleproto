import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBusinessChatLink } from "../../types/TypeInputBusinessChatLink";
import { TypeBusinessChatLink } from "../../types/TypeBusinessChatLink";

export class CreateBusinessChatLink extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2287068814;
    static SUBCLASS_OF_ID = 1007504011;
    static className = "account.CreateBusinessChatLink";
    static classType = "request";

    link!: TypeInputBusinessChatLink;

    constructor(args: { link?: TypeInputBusinessChatLink } = {}) {
        super();
        this.link = args.link!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2287068814, false);
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

    static fromReader(reader: BinaryReader): CreateBusinessChatLink {
        const args: any = {};
        const _link = reader.tgReadObject();
        args.link = _link;
        return new CreateBusinessChatLink(args);
    }
}