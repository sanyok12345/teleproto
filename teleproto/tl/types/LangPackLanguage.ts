import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class LangPackLanguage extends TLObject {
    static CONSTRUCTOR_ID = 4006239459;
    static SUBCLASS_OF_ID = 2880211383;
    static className = "LangPackLanguage";
    static classType = "constructor";

    flags!: number;
    official?: boolean;
    rtl?: boolean;
    beta?: boolean;
    name!: string;
    nativeName!: string;
    langCode!: string;
    baseLangCode?: string;
    pluralCode!: string;
    stringsCount!: number;
    translatedCount!: number;
    translationsUrl!: string;

    constructor(args: { flags?: number, official?: boolean, rtl?: boolean, beta?: boolean, name?: string, nativeName?: string, langCode?: string, baseLangCode?: string, pluralCode?: string, stringsCount?: number, translatedCount?: number, translationsUrl?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.official = args.official;
        this.rtl = args.rtl;
        this.beta = args.beta;
        this.name = args.name!;
        this.nativeName = args.nativeName!;
        this.langCode = args.langCode!;
        this.baseLangCode = args.baseLangCode;
        this.pluralCode = args.pluralCode!;
        this.stringsCount = args.stringsCount!;
        this.translatedCount = args.translatedCount!;
        this.translationsUrl = args.translationsUrl!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4006239459, false);
        let flags = 0;
        if (this.official) { flags |= 1 << 0; }
        if (this.rtl) { flags |= 1 << 2; }
        if (this.beta) { flags |= 1 << 3; }
        if (this.baseLangCode !== undefined && this.baseLangCode !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.official !== undefined && this.official !== null) {
        }
        if (this.rtl !== undefined && this.rtl !== null) {
        }
        if (this.beta !== undefined && this.beta !== null) {
        }
        writer.tgWriteString(this.name);
        writer.tgWriteString(this.nativeName);
        writer.tgWriteString(this.langCode);
        if (this.baseLangCode !== undefined && this.baseLangCode !== null) {
            writer.tgWriteString(this.baseLangCode);
        }
        writer.tgWriteString(this.pluralCode);
        writer.writeInt(this.stringsCount);
        writer.writeInt(this.translatedCount);
        writer.tgWriteString(this.translationsUrl);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LangPackLanguage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _official = true;
            args.official = _official;
        } else {
            args.official = false;
        }
        if (args.flags & (1 << 2)) {
            const _rtl = true;
            args.rtl = _rtl;
        } else {
            args.rtl = false;
        }
        if (args.flags & (1 << 3)) {
            const _beta = true;
            args.beta = _beta;
        } else {
            args.beta = false;
        }
        const _name = reader.tgReadString();
        args.name = _name;
        const _nativeName = reader.tgReadString();
        args.nativeName = _nativeName;
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        if (args.flags & (1 << 1)) {
            const _baseLangCode = reader.tgReadString();
            args.baseLangCode = _baseLangCode;
        } else {
            args.baseLangCode = undefined;
        }
        const _pluralCode = reader.tgReadString();
        args.pluralCode = _pluralCode;
        const _stringsCount = reader.readInt();
        args.stringsCount = _stringsCount;
        const _translatedCount = reader.readInt();
        args.translatedCount = _translatedCount;
        const _translationsUrl = reader.tgReadString();
        args.translationsUrl = _translationsUrl;
        return new LangPackLanguage(args);
    }
}