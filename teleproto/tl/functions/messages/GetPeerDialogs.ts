import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputDialogPeer } from "../../types/TypeInputDialogPeer";
import { TypePeerDialogs } from "../../types/messages/TypePeerDialogs";

export class GetPeerDialogs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3832593661;
    static SUBCLASS_OF_ID = 986120498;
    static className = "messages.GetPeerDialogs";
    static classType = "request";

    peers!: TypeInputDialogPeer[];

    constructor(args: { peers?: TypeInputDialogPeer[] } = {}) {
        super();
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3832593661, false);
        writer.writeVector(this.peers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePeerDialogs {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPeerDialogs {
        const args: any = {};
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new GetPeerDialogs(args);
    }
}