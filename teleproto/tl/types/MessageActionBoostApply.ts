import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionBoostApply extends TLObject {
    static CONSTRUCTOR_ID = 3422726765;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionBoostApply";
    static classType = "constructor";

    boosts!: number;

    constructor(args: { boosts?: number } = {}) {
        super();
        this.boosts = args.boosts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3422726765, false);
        writer.writeInt(this.boosts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionBoostApply {
        const args: any = {};
        const _boosts = reader.readInt();
        args.boosts = _boosts;
        return new MessageActionBoostApply(args);
    }
}