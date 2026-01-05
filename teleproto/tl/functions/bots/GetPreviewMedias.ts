import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeBotPreviewMedia } from "../../types/TypeBotPreviewMedia";

export class GetPreviewMedias extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2728745293;
    static SUBCLASS_OF_ID = 4186319480;
    static className = "bots.GetPreviewMedias";
    static classType = "request";

    bot?: EntityLike;

    constructor(args: { bot?: EntityLike } = {}) {
        super();
        this.bot = args.bot;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2728745293, false);
        writer.write((this.bot! as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBotPreviewMedia[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPreviewMedias {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        return new GetPreviewMedias(args);
    }
}