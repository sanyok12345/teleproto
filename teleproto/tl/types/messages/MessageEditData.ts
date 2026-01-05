import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class MessageEditData extends TLObject {
    static CONSTRUCTOR_ID = 649453030;
    static SUBCLASS_OF_ID = 4215772317;
    static className = "messages.MessageEditData";
    static classType = "constructor";

    flags!: number;
    caption?: boolean;

    constructor(args: { flags?: number, caption?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.caption = args.caption;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(649453030, false);
        let flags = 0;
        if (this.caption) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.caption !== undefined && this.caption !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageEditData {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _caption = true;
            args.caption = _caption;
        } else {
            args.caption = false;
        }
        return new MessageEditData(args);
    }
}