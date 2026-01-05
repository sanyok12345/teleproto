import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class PeerLocated extends TLObject {
    static CONSTRUCTOR_ID = 3393592157;
    static SUBCLASS_OF_ID = 4208604332;
    static className = "PeerLocated";
    static classType = "constructor";

    peer!: TypePeer;
    expires!: number;
    distance!: number;

    constructor(args: { peer?: TypePeer, expires?: number, distance?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.expires = args.expires!;
        this.distance = args.distance!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3393592157, false);
        writer.write(this.peer.getBytes());
        writer.writeInt(this.expires);
        writer.writeInt(this.distance);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerLocated {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _expires = reader.readInt();
        args.expires = _expires;
        const _distance = reader.readInt();
        args.distance = _distance;
        return new PeerLocated(args);
    }
}