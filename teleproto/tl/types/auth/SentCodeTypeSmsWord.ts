import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeSmsWord extends TLObject {
    static CONSTRUCTOR_ID = 2752949377;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeSmsWord";
    static classType = "constructor";

    flags!: number;
    beginning?: string;

    constructor(args: { flags?: number, beginning?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.beginning = args.beginning;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2752949377, false);
        let flags = 0;
        if (this.beginning !== undefined && this.beginning !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.beginning !== undefined && this.beginning !== null) {
            writer.tgWriteString(this.beginning);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeSmsWord {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _beginning = reader.tgReadString();
            args.beginning = _beginning;
        } else {
            args.beginning = undefined;
        }
        return new SentCodeTypeSmsWord(args);
    }
}