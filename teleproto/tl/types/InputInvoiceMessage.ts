import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";
import { MessageIDLike } from "./../../define";

export class InputInvoiceMessage extends TLObject {
    static CONSTRUCTOR_ID = 3317000281;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceMessage";
    static classType = "constructor";

    peer!: TypeInputPeer;
    msgId!: MessageIDLike;

    constructor(args: { peer?: TypeInputPeer, msgId?: MessageIDLike } = {}) {
        super();
        this.peer = args.peer!;
        this.msgId = args.msgId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3317000281, false);
        writer.write(this.peer.getBytes());
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceMessage {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        return new InputInvoiceMessage(args);
    }
}