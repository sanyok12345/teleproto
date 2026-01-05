import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputStickeredMedia } from "../../types/TypeInputStickeredMedia";
import { TypeStickerSetCovered } from "../../types/TypeStickerSetCovered";

export class GetAttachedStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3428542412;
    static SUBCLASS_OF_ID = 3423756139;
    static className = "messages.GetAttachedStickers";
    static classType = "request";

    media!: TypeInputStickeredMedia;

    constructor(args: { media?: TypeInputStickeredMedia } = {}) {
        super();
        this.media = args.media!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3428542412, false);
        writer.write(this.media.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStickerSetCovered[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAttachedStickers {
        const args: any = {};
        const _media = reader.tgReadObject();
        args.media = _media;
        return new GetAttachedStickers(args);
    }
}