import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class MessageActionGeoProximityReached extends TLObject {
    static CONSTRUCTOR_ID = 2564871831;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGeoProximityReached";
    static classType = "constructor";

    fromId!: TypePeer;
    toId!: TypePeer;
    distance!: number;

    constructor(args: { fromId?: TypePeer, toId?: TypePeer, distance?: number } = {}) {
        super();
        this.fromId = args.fromId!;
        this.toId = args.toId!;
        this.distance = args.distance!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2564871831, false);
        writer.write(this.fromId.getBytes());
        writer.write(this.toId.getBytes());
        writer.writeInt(this.distance);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGeoProximityReached {
        const args: any = {};
        const _fromId = reader.tgReadObject();
        args.fromId = _fromId;
        const _toId = reader.tgReadObject();
        args.toId = _toId;
        const _distance = reader.readInt();
        args.distance = _distance;
        return new MessageActionGeoProximityReached(args);
    }
}