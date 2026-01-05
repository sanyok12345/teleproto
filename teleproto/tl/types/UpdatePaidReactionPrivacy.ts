import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePaidReactionPrivacy } from "./TypePaidReactionPrivacy";

export class UpdatePaidReactionPrivacy extends TLObject {
    static CONSTRUCTOR_ID = 2339528654;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePaidReactionPrivacy";
    static classType = "constructor";

    private!: TypePaidReactionPrivacy;

    constructor(args: { private?: TypePaidReactionPrivacy } = {}) {
        super();
        this.private = args.private!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2339528654, false);
        writer.write(this.private.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePaidReactionPrivacy {
        const args: any = {};
        const _private = reader.tgReadObject();
        args.private = _private;
        return new UpdatePaidReactionPrivacy(args);
    }
}