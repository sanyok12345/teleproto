import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";
import { TypePageCaption } from "./TypePageCaption";

export class PageBlockMap extends TLObject {
    static CONSTRUCTOR_ID = 2756656886;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockMap";
    static classType = "constructor";

    geo!: TypeGeoPoint;
    zoom!: number;
    w!: number;
    h!: number;
    caption!: TypePageCaption;

    constructor(args: { geo?: TypeGeoPoint, zoom?: number, w?: number, h?: number, caption?: TypePageCaption } = {}) {
        super();
        this.geo = args.geo!;
        this.zoom = args.zoom!;
        this.w = args.w!;
        this.h = args.h!;
        this.caption = args.caption!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2756656886, false);
        writer.write(this.geo.getBytes());
        writer.writeInt(this.zoom);
        writer.writeInt(this.w);
        writer.writeInt(this.h);
        writer.write(this.caption.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockMap {
        const args: any = {};
        const _geo = reader.tgReadObject();
        args.geo = _geo;
        const _zoom = reader.readInt();
        args.zoom = _zoom;
        const _w = reader.readInt();
        args.w = _w;
        const _h = reader.readInt();
        args.h = _h;
        const _caption = reader.tgReadObject();
        args.caption = _caption;
        return new PageBlockMap(args);
    }
}