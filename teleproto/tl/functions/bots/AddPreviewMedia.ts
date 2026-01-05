import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeBotPreviewMedia } from "../../types/TypeBotPreviewMedia";

export class AddPreviewMedia extends MTProtoRequest {
    static CONSTRUCTOR_ID = 397326170;
    static SUBCLASS_OF_ID = 1445641261;
    static className = "bots.AddPreviewMedia";
    static classType = "request";

    bot?: EntityLike;
    langCode?: string;
    media!: TypeInputMedia;

    constructor(args: { bot?: EntityLike, langCode?: string, media?: TypeInputMedia } = {}) {
        super();
        this.bot = args.bot;
        this.langCode = args.langCode;
        this.media = args.media!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(397326170, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteString(this.langCode!);
        writer.write(this.media.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotPreviewMedia {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AddPreviewMedia {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _media = reader.tgReadObject();
        args.media = _media;
        return new AddPreviewMedia(args);
    }
}