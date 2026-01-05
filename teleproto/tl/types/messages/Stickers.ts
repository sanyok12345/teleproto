import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDocument } from "../TypeDocument";

export class Stickers extends TLObject {
    static CONSTRUCTOR_ID = 816245886;
    static SUBCLASS_OF_ID = 3611015646;
    static className = "messages.Stickers";
    static classType = "constructor";

    hash!: bigint;
    stickers!: TypeDocument[];

    constructor(args: { hash?: bigint, stickers?: TypeDocument[] } = {}) {
        super();
        this.hash = args.hash!;
        this.stickers = args.stickers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(816245886, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.stickers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Stickers {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _stickers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.stickers = _stickers;
        return new Stickers(args);
    }
}