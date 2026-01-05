import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputDocument } from "./TypeInputDocument";

export class InputFileStoryDocument extends TLObject {
    static CONSTRUCTOR_ID = 1658620744;
    static SUBCLASS_OF_ID = 3882180383;
    static className = "InputFileStoryDocument";
    static classType = "constructor";

    id!: TypeInputDocument;

    constructor(args: { id?: TypeInputDocument } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1658620744, false);
        writer.write(this.id.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputFileStoryDocument {
        const args: any = {};
        const _id = reader.tgReadObject();
        args.id = _id;
        return new InputFileStoryDocument(args);
    }
}