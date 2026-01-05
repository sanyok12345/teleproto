import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";
import { EntityLike } from "../../types/../../define";
import { TypeExportedChatlistInvite } from "../../types/chatlists/TypeExportedChatlistInvite";

export class ExportChatlistInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2222081934;
    static SUBCLASS_OF_ID = 3261681385;
    static className = "chatlists.ExportChatlistInvite";
    static classType = "request";

    chatlist!: TypeInputChatlist;
    title!: string;
    peers!: EntityLike[];

    constructor(args: { chatlist?: TypeInputChatlist, title?: string, peers?: EntityLike[] } = {}) {
        super();
        this.chatlist = args.chatlist!;
        this.title = args.title!;
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2222081934, false);
        writer.write(this.chatlist.getBytes());
        writer.tgWriteString(this.title);
        writer.writeVector(this.peers, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedChatlistInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ExportChatlistInvite {
        const args: any = {};
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        const _title = reader.tgReadString();
        args.title = _title;
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new ExportChatlistInvite(args);
    }
}