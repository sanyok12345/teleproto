import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessageID extends TLObject {
    static CONSTRUCTOR_ID = 2792792866;
    static SUBCLASS_OF_ID = 1421262021;
    static className = "InputMessageID";
    static classType = "constructor";

    id!: number;

    constructor(args: { id?: number } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2792792866, false);
        writer.writeInt(this.id);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessageID {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        return new InputMessageID(args);
    }
}