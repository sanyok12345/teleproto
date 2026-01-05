import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMessageMedia } from "./TypeMessageMedia";

export class MessageExtendedMedia extends TLObject {
    static CONSTRUCTOR_ID = 3997670500;
    static SUBCLASS_OF_ID = 2535971165;
    static className = "MessageExtendedMedia";
    static classType = "constructor";

    media!: TypeMessageMedia;

    constructor(args: { media?: TypeMessageMedia } = {}) {
        super();
        this.media = args.media!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3997670500, false);
        writer.write(this.media.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageExtendedMedia {
        const args: any = {};
        const _media = reader.tgReadObject();
        args.media = _media;
        return new MessageExtendedMedia(args);
    }
}