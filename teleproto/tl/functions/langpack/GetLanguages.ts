import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLangPackLanguage } from "../../types/TypeLangPackLanguage";

export class GetLanguages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1120311183;
    static SUBCLASS_OF_ID = 671683273;
    static className = "langpack.GetLanguages";
    static classType = "request";

    langPack!: string;

    constructor(args: { langPack?: string } = {}) {
        super();
        this.langPack = args.langPack!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1120311183, false);
        writer.tgWriteString(this.langPack);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLangPackLanguage[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetLanguages {
        const args: any = {};
        const _langPack = reader.tgReadString();
        args.langPack = _langPack;
        return new GetLanguages(args);
    }
}