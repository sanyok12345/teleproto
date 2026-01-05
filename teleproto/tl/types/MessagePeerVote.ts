import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessagePeerVote extends TLObject {
    static CONSTRUCTOR_ID = 3066834268;
    static SUBCLASS_OF_ID = 2244112898;
    static className = "MessagePeerVote";
    static classType = "constructor";

    peer!: TypePeer;
    option!: Buffer;
    date!: number;

    constructor(args: { peer?: TypePeer, option?: Buffer, date?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.option = args.option!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3066834268, false);
        writer.write(this.peer.getBytes());
        writer.tgWriteBytes(this.option);
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessagePeerVote {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _option = reader.tgReadBytes();
        args.option = _option;
        const _date = reader.readInt();
        args.date = _date;
        return new MessagePeerVote(args);
    }
}