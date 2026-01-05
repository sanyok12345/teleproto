import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLangPackLanguage } from "../../types/TypeLangPackLanguage";

export class GetLanguage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1784243458;
    static SUBCLASS_OF_ID = 2880211383;
    static className = "langpack.GetLanguage";
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
        writer.writeInt(1784243458, false);
        writer.tgWriteString(this.langPack);
        writer.tgWriteString(this.langCode!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLangPackLanguage {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetLanguage {
        const args: any = {};
        const _langPack = reader.tgReadString();
        args.langPack = _langPack;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new GetLanguage(args);
    }
}