import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputDialogPeer extends TLObject {
    static CONSTRUCTOR_ID = 4239064759;
    static SUBCLASS_OF_ID = 2719782805;
    static className = "InputDialogPeer";
    static classType = "constructor";

    peer!: TypeInputPeer;

    constructor(args: { peer?: TypeInputPeer } = {}) {
        super();
        this.peer = args.peer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4239064759, false);
        writer.write(this.peer.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputDialogPeer {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        return new InputDialogPeer(args);
    }
}