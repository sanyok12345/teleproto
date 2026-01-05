import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";

export class DeleteExportedInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1906072670;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "chatlists.DeleteExportedInvite";
    static classType = "request";

    chatlist!: TypeInputChatlist;
    slug!: string;

    constructor(args: { chatlist?: TypeInputChatlist, slug?: string } = {}) {
        super();
        this.chatlist = args.chatlist!;
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1906072670, false);
        writer.write(this.chatlist.getBytes());
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

    static fromReader(reader: BinaryReader): DeleteExportedInvite {
        const args: any = {};
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new DeleteExportedInvite(args);
    }
}