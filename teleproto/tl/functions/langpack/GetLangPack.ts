import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLangPackDifference } from "../../types/TypeLangPackDifference";

export class GetLangPack extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4075959050;
    static SUBCLASS_OF_ID = 1382427989;
    static className = "langpack.GetLangPack";
    static classType = "request";

    langPack!: string;
    langCode?: string;

    constructor(args: { langPack?: string, langCode?: string } = {}) {
        super();
        this.langPack = args.langPack!;
        this.langCode = args.langCode;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4075959050, false);
        writer.tgWriteString(this.langPack);
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLangPackDifference {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetLangPack {
        const args: any = {};
        const _langPack = reader.tgReadString();
        args.langPack = _langPack;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new GetLangPack(args);
    }
}