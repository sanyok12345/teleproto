import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLangPackString } from "../../types/TypeLangPackString";

export class GetStrings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4025104387;
    static SUBCLASS_OF_ID = 3350672701;
    static className = "langpack.GetStrings";
    static classType = "request";

    langPack!: string;
    langCode?: string;
    keys!: string[];

    constructor(args: { langPack?: string, langCode?: string, keys?: string[] } = {}) {
        super();
        this.langPack = args.langPack!;
        this.langCode = args.langCode;
        this.keys = args.keys!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4025104387, false);
        writer.tgWriteString(this.langPack);
        writer.tgWriteString(this.langCode!);
        writer.writeVector(this.keys, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLangPackString[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStrings {
        const args: any = {};
        const _langPack = reader.tgReadString();
        args.langPack = _langPack;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _keys = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.keys = _keys;
        return new GetStrings(args);
    }
}