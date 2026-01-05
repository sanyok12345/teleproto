import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class NotifyPeer extends TLObject {
    static CONSTRUCTOR_ID = 2681474008;
    static SUBCLASS_OF_ID = 3756548142;
    static className = "NotifyPeer";
    static classType = "constructor";

    peer!: TypePeer;

    constructor(args: { peer?: TypePeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2681474008, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): NotifyPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new NotifyPeer(args);
    }
}