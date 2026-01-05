import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhotoSizeProgressive extends TLObject {
    static CONSTRUCTOR_ID = 4198431637;
    static SUBCLASS_OF_ID = 399256025;
    static className = "PhotoSizeProgressive";
    static classType = "constructor";

    type!: string;
    w!: number;
    h!: number;
    sizes!: number[];

    constructor(args: { type?: string, w?: number, h?: number, sizes?: number[] } = {}) {
        super();
        this.type = args.type!;
        this.w = args.w!;
        this.h = args.h!;
        this.sizes = args.sizes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4198431637, false);
        writer.tgWriteString(this.type);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        writer.writeVector(this.sizes, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhotoSizeProgressive {
        const args: any = {};
        const _type = reader.tgReadString();
        args.type = _type;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        const _sizes = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.sizes = _sizes;
        return new PhotoSizeProgressive(args);
    }
}