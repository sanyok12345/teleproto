import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessagePeerVoteMultiple extends TLObject {
    static CONSTRUCTOR_ID = 1177089766;
    static SUBCLASS_OF_ID = 2244112898;
    static className = "MessagePeerVoteMultiple";
    static classType = "constructor";

    peer!: TypePeer;
    options!: Buffer[];
    date!: number;

    constructor(args: { peer?: TypePeer, options?: Buffer[], date?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.options = args.options!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1177089766, false);
        writer.write(this.peer.getBytes());
        writer.writeVector(this.options, (item) => {
            writer.tgWriteBytes(item);
        });
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessagePeerVoteMultiple {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _options = reader.readVector((reader) => {
            const item = reader.tgReadBytes();
            return item;
        });
        args.options = _options;
        const _date = reader.readInt();
        args.date = _date;
        return new MessagePeerVoteMultiple(args);
    }
}