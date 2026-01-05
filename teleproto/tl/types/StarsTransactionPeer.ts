import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class StarsTransactionPeer extends TLObject {
    static CONSTRUCTOR_ID = 3624771933;
    static SUBCLASS_OF_ID = 1102483843;
    static className = "StarsTransactionPeer";
    static classType = "constructor";

    peer!: TypePeer;

    constructor(args: { peer?: TypePeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3624771933, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsTransactionPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new StarsTransactionPeer(args);
    }
}