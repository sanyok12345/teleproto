import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDocument } from "../TypeDocument";

export class SavedGifs extends TLObject {
    static CONSTRUCTOR_ID = 2225089037;
    static SUBCLASS_OF_ID = 2794152437;
    static className = "messages.SavedGifs";
    static classType = "constructor";

    hash!: bigint;
    gifs!: TypeDocument[];

    constructor(args: { hash?: bigint, gifs?: TypeDocument[] } = {}) {
        super();
        this.hash = args.hash!;
        this.gifs = args.gifs!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2225089037, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.gifs, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedGifs {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _gifs = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.gifs = _gifs;
        return new SavedGifs(args);
    }
}