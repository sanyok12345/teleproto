import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatReactionsAll extends TLObject {
    static CONSTRUCTOR_ID = 1385335754;
    static SUBCLASS_OF_ID = 320742581;
    static className = "ChatReactionsAll";
    static classType = "constructor";

    flags!: number;
    allowCustom?: boolean;

    constructor(args: { flags?: number, allowCustom?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.allowCustom = args.allowCustom;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1385335754, false);
        let flags = 0;
        if (this.allowCustom) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.allowCustom !== undefined && this.allowCustom !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatReactionsAll {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _allowCustom = true;
            args.allowCustom = _allowCustom;
        } else {
            args.allowCustom = false;
        }
        return new ChatReactionsAll(args);
    }
}