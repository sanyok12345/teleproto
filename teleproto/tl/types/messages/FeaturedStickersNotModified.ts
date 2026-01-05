import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class FeaturedStickersNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3336309862;
    static SUBCLASS_OF_ID = 638891810;
    static className = "messages.FeaturedStickersNotModified";
    static classType = "constructor";

    count!: number;

    constructor(args: { count?: number } = {}) {
        super();
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3336309862, false);
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): FeaturedStickersNotModified {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        return new FeaturedStickersNotModified(args);
    }
}