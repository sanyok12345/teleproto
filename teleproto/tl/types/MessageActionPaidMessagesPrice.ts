import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionPaidMessagesPrice extends TLObject {
    static CONSTRUCTOR_ID = 2226685304;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPaidMessagesPrice";
    static classType = "constructor";

    flags!: number;
    broadcastMessagesAllowed?: boolean;
    stars!: bigint;

    constructor(args: { flags?: number, broadcastMessagesAllowed?: boolean, stars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.broadcastMessagesAllowed = args.broadcastMessagesAllowed;
        this.stars = args.stars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2226685304, false);
        let flags = 0;
        if (this.broadcastMessagesAllowed) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.broadcastMessagesAllowed !== undefined && this.broadcastMessagesAllowed !== null) {
        }
        writer.writeLargeInt(this.stars, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPaidMessagesPrice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _broadcastMessagesAllowed = true;
            args.broadcastMessagesAllowed = _broadcastMessagesAllowed;
        } else {
            args.broadcastMessagesAllowed = false;
        }
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        return new MessageActionPaidMessagesPrice(args);
    }
}