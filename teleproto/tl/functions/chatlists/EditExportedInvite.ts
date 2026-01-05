import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";
import { EntityLike } from "../../types/../../define";
import { TypeExportedChatlistInvite } from "../../types/TypeExportedChatlistInvite";

export class EditExportedInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1698543165;
    static SUBCLASS_OF_ID = 1997666559;
    static className = "chatlists.EditExportedInvite";
    static classType = "request";

    flags?: number;
    chatlist!: TypeInputChatlist;
    slug!: string;
    title?: string;
    peers?: EntityLike[];

    constructor(args: { flags?: number, chatlist?: TypeInputChatlist, slug?: string, title?: string, peers?: EntityLike[] } = {}) {
        super();
        this.flags = args.flags;
        this.chatlist = args.chatlist!;
        this.slug = args.slug!;
        this.title = args.title;
        this.peers = args.peers;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1698543165, false);
        let flags = 0;
        if (this.title !== undefined && this.title !== null) { flags |= 1 << 1; }
        if (this.peers !== undefined && this.peers !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.write(this.chatlist.getBytes());
        writer.tgWriteString(this.slug);
        if (this.title !== undefined && this.title !== null) {
            writer.tgWriteString(this.title);
        }
        if (this.peers !== undefined && this.peers !== null) {
            writer.writeVector(this.peers, (item) => {
                writer.write((item as any).getBytes());
            });
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeExportedChatlistInvite {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditExportedInvite {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        if (args.flags & (1 << 1)) {
            const _title = reader.tgReadString();
            args.title = _title;
        } else {
            args.title = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _peers = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.peers = _peers;
        } else {
            args.peers = undefined;
        }
        return new EditExportedInvite(args);
    }
}