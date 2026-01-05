import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MediaAreaCoordinates extends TLObject {
    static CONSTRUCTOR_ID = 3486113794;
    static SUBCLASS_OF_ID = 491031609;
    static className = "MediaAreaCoordinates";
    static classType = "constructor";

    flags!: number;
    x!: number;
    y!: number;
    w!: number;
    h!: number;
    rotation!: number;
    radius?: number;

    constructor(args: { flags?: number, x?: number, y?: number, w?: number, h?: number, rotation?: number, radius?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.x = args.x!;
        this.y = args.y!;
        this.w = args.w!;
        this.h = args.h!;
        this.rotation = args.rotation!;
        this.radius = args.radius;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3486113794, false);
        let flags = 0;
        if (this.radius !== undefined && this.radius !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeDouble(this.x);
        writer.writeDouble(this.y);
        writer.writeDouble(this.w);
        writer.writeDouble(this.h);
        writer.writeDouble(this.rotation);
        if (this.radius !== undefined && this.radius !== null) {
            writer.writeDouble(this.radius);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaCoordinates {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _x = reader.readDouble();
        args.x = _x;
        const _y = reader.readDouble();
        args.y = _y;
        const _w = reader.readDouble();
        args.w = _w;
        const _h = reader.readDouble();
        args.h = _h;
        const _rotation = reader.readDouble();
        args.rotation = _rotation;
        if (args.flags & (1 << 0)) {
            const _radius = reader.readDouble();
            args.radius = _radius;
        } else {
            args.radius = undefined;
        }
        return new MediaAreaCoordinates(args);
    }
}