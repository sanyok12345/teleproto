import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeerLocated } from "./TypePeerLocated";

export class UpdatePeerLocated extends TLObject {
    static CONSTRUCTOR_ID = 3031420848;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePeerLocated";
    static classType = "constructor";

    peers!: TypePeerLocated[];

    constructor(args: { peers?: TypePeerLocated[] } = {}) {
        super();
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3031420848, false);
        writer.writeVector(this.peers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePeerLocated {
        const args: any = {};
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new UpdatePeerLocated(args);
    }
}