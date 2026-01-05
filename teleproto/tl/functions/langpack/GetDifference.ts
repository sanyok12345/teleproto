import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLangPackDifference } from "../../types/TypeLangPackDifference";

export class GetDifference extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3449309861;
    static SUBCLASS_OF_ID = 1382427989;
    static className = "langpack.GetDifference";
    static classType = "request";

    langPack!: string;
    langCode?: string;
    fromVersion!: number;

    constructor(args: { langPack?: string, langCode?: string, fromVersion?: number } = {}) {
        super();
        this.langPack = args.langPack!;
        this.langCode = args.langCode;
        this.fromVersion = args.fromVersion!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3449309861, false);
        writer.tgWriteString(this.langPack);
        writer.tgWriteString(this.langCode!);
        writer.writeInt(this.fromVersion);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLangPackDifference {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDifference {
        const args: any = {};
        const _langPack = reader.tgReadString();
        args.langPack = _langPack;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _fromVersion = reader.readInt();
        args.fromVersion = _fromVersion;
        return new GetDifference(args);
    }
}