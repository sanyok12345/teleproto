import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDocument } from "../TypeDocument";

export class SavedMusic extends TLObject {
    static CONSTRUCTOR_ID = 883094167;
    static SUBCLASS_OF_ID = 4162039351;
    static className = "users.SavedMusic";
    static classType = "constructor";

    count!: number;
    documents!: TypeDocument[];

    constructor(args: { count?: number, documents?: TypeDocument[] } = {}) {
        super();
        this.count = args.count!;
        this.documents = args.documents!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(883094167, false);
        writer.writeInt(this.count);
        writer.writeVector(this.documents, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedMusic {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _documents = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.documents = _documents;
        return new SavedMusic(args);
    }
}