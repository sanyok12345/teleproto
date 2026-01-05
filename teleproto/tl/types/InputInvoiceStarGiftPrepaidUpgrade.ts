import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputInvoiceStarGiftPrepaidUpgrade extends TLObject {
    static CONSTRUCTOR_ID = 2584430776;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceStarGiftPrepaidUpgrade";
    static classType = "constructor";

    peer!: TypeInputPeer;
    hash!: string;

    constructor(args: { peer?: TypeInputPeer, hash?: string } = {}) {
        super();
        this.peer = args.peer!;
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2584430776, false);
        writer.write(this.peer.getBytes());
        writer.tgWriteString(this.hash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceStarGiftPrepaidUpgrade {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _hash = reader.tgReadString();
        args.hash = _hash;
        return new InputInvoiceStarGiftPrepaidUpgrade(args);
    }
}