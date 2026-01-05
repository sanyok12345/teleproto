import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";
import { TypeBotPreviewMedia } from "../../types/TypeBotPreviewMedia";

export class EditPreviewMedia extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2233819247;
    static SUBCLASS_OF_ID = 1445641261;
    static className = "bots.EditPreviewMedia";
    static classType = "request";

    bot?: EntityLike;
    langCode?: string;
    media!: TypeInputMedia;
    newMedia!: TypeInputMedia;

    constructor(args: { bot?: EntityLike, langCode?: string, media?: TypeInputMedia, newMedia?: TypeInputMedia } = {}) {
        super();
        this.bot = args.bot;
        this.langCode = args.langCode;
        this.media = args.media!;
        this.newMedia = args.newMedia!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2233819247, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteString(this.langCode!);
        writer.write(this.media.getBytes());
        writer.write(this.newMedia.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotPreviewMedia {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditPreviewMedia {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _media = reader.tgReadObject();
        args.media = _media;
        const _newMedia = reader.tgReadObject();
        args.newMedia = _newMedia;
        return new EditPreviewMedia(args);
    }
}