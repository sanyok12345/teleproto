import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";

export class MediaAreaUrl extends TLObject {
    static CONSTRUCTOR_ID = 926421125;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "MediaAreaUrl";
    static classType = "constructor";

    coordinates!: TypeMediaAreaCoordinates;
    url!: string;

    constructor(args: { coordinates?: TypeMediaAreaCoordinates, url?: string } = {}) {
        super();
        this.coordinates = args.coordinates!;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(926421125, false);
        writer.write(this.coordinates.getBytes());
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaUrl {
        const args: any = {};
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _url = reader.tgReadString();
        args.url = _url;
        return new MediaAreaUrl(args);
    }
}