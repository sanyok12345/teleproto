import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeLangPackString } from "./TypeLangPackString";

export class LangPackDifference extends TLObject {
    static CONSTRUCTOR_ID = 4085629430;
    static SUBCLASS_OF_ID = 1382427989;
    static className = "LangPackDifference";
    static classType = "constructor";

    langCode!: string;
    fromVersion!: number;
    version!: number;
    strings!: TypeLangPackString[];

    constructor(args: { langCode?: string, fromVersion?: number, version?: number, strings?: TypeLangPackString[] } = {}) {
        super();
        this.langCode = args.langCode!;
        this.fromVersion = args.fromVersion!;
        this.version = args.version!;
        this.strings = args.strings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4085629430, false);
        writer.tgWriteString(this.langCode);
        writer.writeInt(this.fromVersion);
        writer.writeInt(this.version);
        writer.writeVector(this.strings, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LangPackDifference {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        const _fromVersion = reader.readInt();
        args.fromVersion = _fromVersion;
        const _version = reader.readInt();
        args.version = _version;
        const _strings = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.strings = _strings;
        return new LangPackDifference(args);
    }
}