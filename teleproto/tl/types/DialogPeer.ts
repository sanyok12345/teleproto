import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class DialogPeer extends TLObject {
    static CONSTRUCTOR_ID = 3849174789;
    static SUBCLASS_OF_ID = 627892654;
    static className = "DialogPeer";
    static classType = "constructor";

    peer!: TypePeer;

    constructor(args: { peer?: TypePeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3849174789, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new DialogPeer(args);
    }
}