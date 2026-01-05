import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RequirementToContactPaidMessages extends TLObject {
    static CONSTRUCTOR_ID = 3036053139;
    static SUBCLASS_OF_ID = 2373280657;
    static className = "RequirementToContactPaidMessages";
    static classType = "constructor";

    starsAmount!: bigint;

    constructor(args: { starsAmount?: bigint } = {}) {
        super();
        this.starsAmount = args.starsAmount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3036053139, false);
        writer.writeLargeInt(this.starsAmount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RequirementToContactPaidMessages {
        const args: any = {};
        const _starsAmount = reader.readLargeInt(64);
        args.starsAmount = _starsAmount;
        return new RequirementToContactPaidMessages(args);
    }
}