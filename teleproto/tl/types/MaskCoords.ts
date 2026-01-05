import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MaskCoords extends TLObject {
    static CONSTRUCTOR_ID = 2933316530;
    static SUBCLASS_OF_ID = 112964349;
    static className = "MaskCoords";
    static classType = "constructor";

    n!: number;
    x!: number;
    y!: number;
    zoom!: number;

    constructor(args: { n?: number, x?: number, y?: number, zoom?: number } = {}) {
        super();
        this.n = args.n!;
        this.x = args.x!;
        this.y = args.y!;
        this.zoom = args.zoom!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2933316530, false);
        writer.writeInt(this.n);
        writer.writeDouble(this.x);
        writer.writeDouble(this.y);
        writer.writeDouble(this.zoom);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MaskCoords {
        const args: any = {};
        const _n = reader.readInt();
        args.n = _n;
        const _x = reader.readDouble();
        args.x = _x;
        const _y = reader.readDouble();
        args.y = _y;
        const _zoom = reader.readDouble();
        args.zoom = _zoom;
        return new MaskCoords(args);
    }
}