import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class MessageActionSuggestedPostSuccess extends TLObject {
    static CONSTRUCTOR_ID = 2514341737;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSuggestedPostSuccess";
    static classType = "constructor";

    price!: TypeStarsAmount;

    constructor(args: { price?: TypeStarsAmount } = {}) {
        super();
        this.price = args.price!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2514341737, false);
        writer.write(this.price.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSuggestedPostSuccess {
        const args: any = {};
        const _price = reader.tgReadObject();
        args.price = _price;
        return new MessageActionSuggestedPostSuccess(args);
    }
}