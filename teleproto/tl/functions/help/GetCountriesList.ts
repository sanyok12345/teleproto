import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeCountriesList } from "../../types/help/TypeCountriesList";

export class GetCountriesList extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1935116200;
    static SUBCLASS_OF_ID = 3929144968;
    static className = "help.GetCountriesList";
    static classType = "request";

    langCode?: string;
    hash?: number;

    constructor(args: { langCode?: string, hash?: number } = {}) {
        super();
        this.langCode = args.langCode;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1935116200, false);
        writer.tgWriteString(this.langCode!);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCountriesList {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetCountriesList {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetCountriesList(args);
    }
}