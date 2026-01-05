import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeWallPaper } from "../TypeWallPaper";

export class WallPapers extends TLObject {
    static CONSTRUCTOR_ID = 3452142988;
    static SUBCLASS_OF_ID = 2730838269;
    static className = "account.WallPapers";
    static classType = "constructor";

    hash!: bigint;
    wallpapers!: TypeWallPaper[];

    constructor(args: { hash?: bigint, wallpapers?: TypeWallPaper[] } = {}) {
        super();
        this.hash = args.hash!;
        this.wallpapers = args.wallpapers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3452142988, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.wallpapers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WallPapers {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _wallpapers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.wallpapers = _wallpapers;
        return new WallPapers(args);
    }
}