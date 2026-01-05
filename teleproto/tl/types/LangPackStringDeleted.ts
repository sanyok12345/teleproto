import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class LangPackStringDeleted extends TLObject {
    static CONSTRUCTOR_ID = 695856818;
    static SUBCLASS_OF_ID = 3692534457;
    static className = "LangPackStringDeleted";
    static classType = "constructor";

    key!: string;

    constructor(args: { key?: string } = {}) {
        super();
        this.key = args.key!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(695856818, false);
        writer.tgWriteString(this.key);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LangPackStringDeleted {
        const args: any = {};
        const _key = reader.tgReadString();
        args.key = _key;
        return new LangPackStringDeleted(args);
    }
}