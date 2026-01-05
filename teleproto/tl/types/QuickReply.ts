import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class QuickReply extends TLObject {
    static CONSTRUCTOR_ID = 110563371;
    static SUBCLASS_OF_ID = 3806990098;
    static className = "QuickReply";
    static classType = "constructor";

    shortcutId!: number;
    shortcut!: string;
    topMessage!: number;
    count!: number;

    constructor(args: { shortcutId?: number, shortcut?: string, topMessage?: number, count?: number } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
        this.shortcut = args.shortcut!;
        this.topMessage = args.topMessage!;
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(110563371, false);
        writer.writeInt(this.shortcutId);
        writer.tgWriteString(this.shortcut);
        writer.writeInt(this.topMessage);
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): QuickReply {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _shortcut = reader.tgReadString();
        args.shortcut = _shortcut;
        const _topMessage = reader.readInt();
        args.topMessage = _topMessage;
        const _count = reader.readInt();
        args.count = _count;
        return new QuickReply(args);
    }
}