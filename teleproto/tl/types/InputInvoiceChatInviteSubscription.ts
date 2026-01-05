import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputInvoiceChatInviteSubscription extends TLObject {
    static CONSTRUCTOR_ID = 887591921;
    static SUBCLASS_OF_ID = 1919851518;
    static className = "InputInvoiceChatInviteSubscription";
    static classType = "constructor";

    hash!: string;

    constructor(args: { hash?: string } = {}) {
        super();
        this.hash = args.hash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(887591921, false);
        writer.tgWriteString(this.hash);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputInvoiceChatInviteSubscription {
        const args: any = {};
        const _hash = reader.tgReadString();
        args.hash = _hash;
        return new InputInvoiceChatInviteSubscription(args);
    }
}