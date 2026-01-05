import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageMedia } from "./TypeMessageMedia";

export class BotPreviewMedia extends TLObject {
    static CONSTRUCTOR_ID = 602479523;
    static SUBCLASS_OF_ID = 1445641261;
    static className = "BotPreviewMedia";
    static classType = "constructor";

    date!: number;
    media!: TypeMessageMedia;

    constructor(args: { date?: number, media?: TypeMessageMedia } = {}) {
        super();
        this.date = args.date!;
        this.media = args.media!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(602479523, false);
        writer.writeInt(this.date);
        writer.write(this.media.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotPreviewMedia {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        const _media = reader.tgReadObject();
        args.media = _media;
        return new BotPreviewMedia(args);
    }
}