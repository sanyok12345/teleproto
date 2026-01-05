import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class PeerBlocked extends TLObject {
    static CONSTRUCTOR_ID = 3908927508;
    static SUBCLASS_OF_ID = 1425210520;
    static className = "PeerBlocked";
    static classType = "constructor";

    peerId!: TypePeer;
    date!: number;

    constructor(args: { peerId?: TypePeer, date?: number } = {}) {
        super();
        this.peerId = args.peerId!;
        this.date = args.date!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3908927508, false);
        writer.write(this.peerId.getBytes());
        writer.writeInt(this.date);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerBlocked {
        const args: any = {};
        const _peerId = reader.tgReadObject();
        args.peerId = _peerId;
        const _date = reader.readInt();
        args.date = _date;
        return new PeerBlocked(args);
    }
}