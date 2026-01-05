import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypePreviewInfo } from "../../types/bots/TypePreviewInfo";

export class GetPreviewInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1111143341;
    static SUBCLASS_OF_ID = 4039278389;
    static className = "bots.GetPreviewInfo";
    static classType = "request";

    bot?: EntityLike;
    langCode?: string;

    constructor(args: { bot?: EntityLike, langCode?: string } = {}) {
        super();
        this.bot = args.bot;
        this.langCode = args.langCode;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1111143341, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePreviewInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPreviewInfo {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new GetPreviewInfo(args);
    }
}