import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputMedia } from "../../types/TypeInputMedia";

export class DeletePreviewMedia extends MTProtoRequest {
    static CONSTRUCTOR_ID = 755054003;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.DeletePreviewMedia";
    static classType = "request";

    bot?: EntityLike;
    langCode?: string;
    media!: TypeInputMedia[];

    constructor(args: { bot?: EntityLike, langCode?: string, media?: TypeInputMedia[] } = {}) {
        super();
        this.bot = args.bot;
        this.langCode = args.langCode;
        this.media = args.media!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(755054003, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteString(this.langCode!);
        writer.writeVector(this.media, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeletePreviewMedia {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _media = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.media = _media;
        return new DeletePreviewMedia(args);
    }
}