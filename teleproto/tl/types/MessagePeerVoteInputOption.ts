import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessagePeerVoteInputOption extends TLObject {
    static CONSTRUCTOR_ID = 1959634180;
    static SUBCLASS_OF_ID = 2244112898;
    static className = "MessagePeerVoteInputOption";
    static classType = "constructor";

    peer!: TypePeer;
    date!: number;

    constructor(args: { peer?: TypePeer, date?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1959634180, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessagePeerVoteInputOption {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _date = reader.readInt();
        args.date = _date;
        return new MessagePeerVoteInputOption(args);
    }
}