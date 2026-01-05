import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateLangPackTooLong extends TLObject {
    static CONSTRUCTOR_ID = 1180041828;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateLangPackTooLong";
    static classType = "constructor";

    langCode!: string;

    constructor(args: { langCode?: string } = {}) {
        super();
        this.langCode = args.langCode!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1180041828, false);
        writer.tgWriteString(this.langCode);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateLangPackTooLong {
        const args: any = {};
        const _langCode = reader.tgReadString();
        args.langCode = _langCode;
        return new UpdateLangPackTooLong(args);
    }
}