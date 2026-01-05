import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeRichText } from "./TypeRichText";

export class TextConcat extends TLObject {
    static CONSTRUCTOR_ID = 2120376535;
    static SUBCLASS_OF_ID = 4056986745;
    static className = "TextConcat";
    static classType = "constructor";

    texts!: TypeRichText[];

    constructor(args: { texts?: TypeRichText[] } = {}) {
        super();
        this.texts = args.texts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2120376535, false);
        writer.writeVector(this.texts, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextConcat {
        const args: any = {};
        const _texts = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.texts = _texts;
        return new TextConcat(args);
    }
}