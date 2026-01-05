import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeAvailableEffect } from "../TypeAvailableEffect";
import { TypeDocument } from "../TypeDocument";

export class AvailableEffects extends TLObject {
    static CONSTRUCTOR_ID = 3185271150;
    static SUBCLASS_OF_ID = 1148245437;
    static className = "messages.AvailableEffects";
    static classType = "constructor";

    hash!: number;
    effects!: TypeAvailableEffect[];
    documents!: TypeDocument[];

    constructor(args: { hash?: number, effects?: TypeAvailableEffect[], documents?: TypeDocument[] } = {}) {
        super();
        this.hash = args.hash!;
        this.effects = args.effects!;
        this.documents = args.documents!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3185271150, false);
        writer.writeInt(this.hash);
        writer.writeVector(this.effects, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.documents, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): AvailableEffects {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        const _effects = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.effects = _effects;
        const _documents = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.documents = _documents;
        return new AvailableEffects(args);
    }
}