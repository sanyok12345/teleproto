import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeFlashCall extends TLObject {
    static CONSTRUCTOR_ID = 2869151449;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeFlashCall";
    static classType = "constructor";

    pattern!: string;

    constructor(args: { pattern?: string } = {}) {
        super();
        this.pattern = args.pattern!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2869151449, false);
        writer.tgWriteString(this.pattern);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeFlashCall {
        const args: any = {};
        const _pattern = reader.tgReadString();
        args.pattern = _pattern;
        return new SentCodeTypeFlashCall(args);
    }
}