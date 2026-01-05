import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeGeoPoint } from "./TypeGeoPoint";

export class MessageMediaGeo extends TLObject {
    static CONSTRUCTOR_ID = 1457575028;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaGeo";
    static classType = "constructor";

    geo!: TypeGeoPoint;

    constructor(args: { geo?: TypeGeoPoint } = {}) {
        super();
        this.geo = args.geo!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1457575028, false);
        writer.write(this.geo.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaGeo {
        const args: any = {};
        const _geo = reader.tgReadObject();
        args.geo = _geo;
        return new MessageMediaGeo(args);
    }
}