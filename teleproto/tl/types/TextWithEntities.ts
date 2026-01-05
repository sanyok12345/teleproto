import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageEntity } from "./TypeMessageEntity";

export class TextWithEntities extends TLObject {
    static CONSTRUCTOR_ID = 1964978502;
    static SUBCLASS_OF_ID = 2513062661;
    static className = "TextWithEntities";
    static classType = "constructor";

    text!: string;
    entities!: TypeMessageEntity[];

    constructor(args: { text?: string, entities?: TypeMessageEntity[] } = {}) {
        super();
        this.text = args.text!;
        this.entities = args.entities!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1964978502, false);
        writer.tgWriteString(this.text);
        writer.writeVector(this.entities, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TextWithEntities {
        const args: any = {};
        const _text = reader.tgReadString();
        args.text = _text;
        const _entities = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.entities = _entities;
        return new TextWithEntities(args);
    }
}