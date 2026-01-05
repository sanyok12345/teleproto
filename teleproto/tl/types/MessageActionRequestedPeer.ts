import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageActionRequestedPeer extends TLObject {
    static CONSTRUCTOR_ID = 827428507;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionRequestedPeer";
    static classType = "constructor";

    buttonId!: number;
    peers!: TypePeer[];

    constructor(args: { buttonId?: number, peers?: TypePeer[] } = {}) {
        super();
        this.buttonId = args.buttonId!;
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(827428507, false);
        writer.writeInt(this.buttonId);
        writer.writeVector(this.peers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionRequestedPeer {
        const args: any = {};
        const _buttonId = reader.readInt();
        args.buttonId = _buttonId;
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new MessageActionRequestedPeer(args);
    }
}