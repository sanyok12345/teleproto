import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessageReplyTo extends TLObject {
    static CONSTRUCTOR_ID = 3134751637;
    static SUBCLASS_OF_ID = 1421262021;
    static className = "InputMessageReplyTo";
    static classType = "constructor";

    id!: number;

    constructor(args: { id?: number } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3134751637, false);
        writer.writeInt(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessageReplyTo {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        return new InputMessageReplyTo(args);
    }
}