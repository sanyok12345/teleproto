import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputNotifyPeer extends TLObject {
    static CONSTRUCTOR_ID = 3099351820;
    static SUBCLASS_OF_ID = 1486362133;
    static className = "InputNotifyPeer";
    static classType = "constructor";

    peer!: TypeInputPeer;

    constructor(args: { peer?: TypeInputPeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3099351820, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputNotifyPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new InputNotifyPeer(args);
    }
}