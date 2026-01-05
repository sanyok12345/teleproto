import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionPaidMessagesRefunded extends TLObject {
    static CONSTRUCTOR_ID = 2887720909;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPaidMessagesRefunded";
    static classType = "constructor";

    count!: number;
    stars!: bigint;

    constructor(args: { count?: number, stars?: bigint } = {}) {
        super();
        this.count = args.count!;
        this.stars = args.stars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2887720909, false);
        writer.writeInt(this.count);
        writer.writeLargeInt(this.stars, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPaidMessagesRefunded {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        return new MessageActionPaidMessagesRefunded(args);
    }
}