import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputGeoPoint } from "./TypeInputGeoPoint";

export class InputMediaGeoPoint extends TLObject {
    static CONSTRUCTOR_ID = 4190388548;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaGeoPoint";
    static classType = "constructor";

    geoPoint!: TypeInputGeoPoint;

    constructor(args: { geoPoint?: TypeInputGeoPoint } = {}) {
        super();
        this.geoPoint = args.geoPoint!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4190388548, false);
        writer.write(this.geoPoint.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaGeoPoint {
        const args: any = {};
        const _geoPoint = reader.tgReadObject();
        args.geoPoint = _geoPoint;
        return new InputMediaGeoPoint(args);
    }
}