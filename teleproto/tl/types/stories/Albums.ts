import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStoryAlbum } from "../TypeStoryAlbum";

export class Albums extends TLObject {
    static CONSTRUCTOR_ID = 3281549882;
    static SUBCLASS_OF_ID = 94846265;
    static className = "stories.Albums";
    static classType = "constructor";

    hash!: bigint;
    albums!: TypeStoryAlbum[];

    constructor(args: { hash?: bigint, albums?: TypeStoryAlbum[] } = {}) {
        super();
        this.hash = args.hash!;
        this.albums = args.albums!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3281549882, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.albums, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Albums {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _albums = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.albums = _albums;
        return new Albums(args);
    }
}