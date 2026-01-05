import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";

export class MediaAreaWeather extends TLObject {
    static CONSTRUCTOR_ID = 1235637404;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "MediaAreaWeather";
    static classType = "constructor";

    coordinates!: TypeMediaAreaCoordinates;
    emoji!: string;
    temperatureC!: number;
    color!: number;

    constructor(args: { coordinates?: TypeMediaAreaCoordinates, emoji?: string, temperatureC?: number, color?: number } = {}) {
        super();
        this.coordinates = args.coordinates!;
        this.emoji = args.emoji!;
        this.temperatureC = args.temperatureC!;
        this.color = args.color!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1235637404, false);
        writer.write(this.coordinates.getBytes());
        writer.tgWriteString(this.emoji);
        writer.writeDouble(this.temperatureC);
        writer.writeInt(this.color);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MediaAreaWeather {
        const args: any = {};
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _emoji = reader.tgReadString();
        args.emoji = _emoji;
        const _temperatureC = reader.readDouble();
        args.temperatureC = _temperatureC;
        const _color = reader.readInt();
        args.color = _color;
        return new MediaAreaWeather(args);
    }
}