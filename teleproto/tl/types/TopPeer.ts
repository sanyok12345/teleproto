import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class TopPeer extends TLObject {
    static CONSTRUCTOR_ID = 3989684315;
    static SUBCLASS_OF_ID = 1763100161;
    static className = "TopPeer";
    static classType = "constructor";

    peer!: TypePeer;
    rating!: number;

    constructor(args: { peer?: TypePeer, rating?: number } = {}) {
        super();
        this.peer = args.peer!;
        this.rating = args.rating!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3989684315, false);
        writer.write(this.peer.getBytes());
        writer.writeDouble(this.rating);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _rating = reader.readDouble();
        args.rating = _rating;
        return new TopPeer(args);
    }
}