import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatlist } from "../../types/TypeInputChatlist";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class JoinChatlistUpdates extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3767138549;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "chatlists.JoinChatlistUpdates";
    static classType = "request";

    chatlist!: TypeInputChatlist;
    peers!: EntityLike[];

    constructor(args: { chatlist?: TypeInputChatlist, peers?: EntityLike[] } = {}) {
        super();
        this.chatlist = args.chatlist!;
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3767138549, false);
        writer.write(this.chatlist.getBytes());
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

    static fromReader(reader: BinaryReader): JoinChatlistUpdates {
        const args: any = {};
        const _chatlist = reader.tgReadObject();
        args.chatlist = _chatlist;
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new JoinChatlistUpdates(args);
    }
}