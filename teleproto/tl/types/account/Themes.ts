import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTheme } from "../TypeTheme";

export class Themes extends TLObject {
    static CONSTRUCTOR_ID = 2587724909;
    static SUBCLASS_OF_ID = 2143625732;
    static className = "account.Themes";
    static classType = "constructor";

    hash!: bigint;
    themes!: TypeTheme[];

    constructor(args: { hash?: bigint, themes?: TypeTheme[] } = {}) {
        super();
        this.hash = args.hash!;
        this.themes = args.themes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2587724909, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.themes, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Themes {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _themes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.themes = _themes;
        return new Themes(args);
    }
}