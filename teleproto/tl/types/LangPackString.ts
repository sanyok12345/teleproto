import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class LangPackString extends TLObject {
    static CONSTRUCTOR_ID = 3402727926;
    static SUBCLASS_OF_ID = 3692534457;
    static className = "LangPackString";
    static classType = "constructor";

    key!: string;
    value!: string;

    constructor(args: { key?: string, value?: string } = {}) {
        super();
        this.key = args.key!;
        this.value = args.value!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3402727926, false);
        writer.tgWriteString(this.key);
        writer.tgWriteString(this.value);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): LangPackString {
        const args: any = {};
        const _key = reader.tgReadString();
        args.key = _key;
        const _value = reader.tgReadString();
        args.value = _value;
        return new LangPackString(args);
    }
}