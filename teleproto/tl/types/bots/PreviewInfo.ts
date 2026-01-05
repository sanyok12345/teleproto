import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeBotPreviewMedia } from "../TypeBotPreviewMedia";

export class PreviewInfo extends TLObject {
    static CONSTRUCTOR_ID = 212278628;
    static SUBCLASS_OF_ID = 4039278389;
    static className = "bots.PreviewInfo";
    static classType = "constructor";

    media!: TypeBotPreviewMedia[];
    langCodes!: string[];

    constructor(args: { media?: TypeBotPreviewMedia[], langCodes?: string[] } = {}) {
        super();
        this.media = args.media!;
        this.langCodes = args.langCodes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(212278628, false);
        writer.writeVector(this.media, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.langCodes, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PreviewInfo {
        const args: any = {};
        const _media = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.media = _media;
        const _langCodes = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.langCodes = _langCodes;
        return new PreviewInfo(args);
    }
}