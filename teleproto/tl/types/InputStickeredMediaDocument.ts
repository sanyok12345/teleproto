import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputDocument } from "./TypeInputDocument";

export class InputStickeredMediaDocument extends TLObject {
    static CONSTRUCTOR_ID = 70813275;
    static SUBCLASS_OF_ID = 1363597726;
    static className = "InputStickeredMediaDocument";
    static classType = "constructor";

    id!: TypeInputDocument;

    constructor(args: { id?: TypeInputDocument } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(70813275, false);
        writer.write(this.id.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStickeredMediaDocument {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new InputStickeredMediaDocument(args);
    }
}