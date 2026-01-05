import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeDocument } from "../TypeDocument";

export class SavedRingtoneConverted extends TLObject {
    static CONSTRUCTOR_ID = 523271863;
    static SUBCLASS_OF_ID = 2984412196;
    static className = "account.SavedRingtoneConverted";
    static classType = "constructor";

    document!: TypeDocument;

    constructor(args: { document?: TypeDocument } = {}) {
        super();
        this.document = args.document!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(523271863, false);
        writer.write(this.document.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedRingtoneConverted {
        const args: any = {};
        const _document = reader.tgReadObject();
        args.document = _document;
        return new SavedRingtoneConverted(args);
    }
}