import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionSuggestedPostRefund extends TLObject {
    static CONSTRUCTOR_ID = 1777932024;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSuggestedPostRefund";
    static classType = "constructor";

    flags!: number;
    payerInitiated?: boolean;

    constructor(args: { flags?: number, payerInitiated?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.payerInitiated = args.payerInitiated;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1777932024, false);
        let flags = 0;
        if (this.payerInitiated) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.payerInitiated !== undefined && this.payerInitiated !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSuggestedPostRefund {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _payerInitiated = true;
            args.payerInitiated = _payerInitiated;
        } else {
            args.payerInitiated = false;
        }
        return new MessageActionSuggestedPostRefund(args);
    }
}