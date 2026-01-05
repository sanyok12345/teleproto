import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRequestedPeer } from "./TypeRequestedPeer";

export class MessageActionRequestedPeerSentMe extends TLObject {
    static CONSTRUCTOR_ID = 2477987912;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionRequestedPeerSentMe";
    static classType = "constructor";

    buttonId!: number;
    peers!: TypeRequestedPeer[];

    constructor(args: { buttonId?: number, peers?: TypeRequestedPeer[] } = {}) {
        super();
        this.buttonId = args.buttonId!;
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2477987912, false);
        writer.writeInt(this.buttonId);
        writer.writeVector(this.peers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionRequestedPeerSentMe {
        const args: any = {};
        const _buttonId = reader.readInt();
        args.buttonId = _buttonId;
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new MessageActionRequestedPeerSentMe(args);
    }
}