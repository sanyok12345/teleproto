import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class JoinChatlistInvite extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2796675994;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "chatlists.JoinChatlistInvite";
    static classType = "request";

    slug!: string;
    peers!: EntityLike[];

    constructor(args: { slug?: string, peers?: EntityLike[] } = {}) {
        super();
        this.slug = args.slug!;
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2796675994, false);
        writer.tgWriteString(this.slug);
        writer.writeVector(this.peers, (item) => {
            writer.write((item as any).getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): JoinChatlistInvite {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new JoinChatlistInvite(args);
    }
}