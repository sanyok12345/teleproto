import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputQuickReplyShortcutId extends TLObject {
    static CONSTRUCTOR_ID = 18418929;
    static SUBCLASS_OF_ID = 2775088215;
    static className = "InputQuickReplyShortcutId";
    static classType = "constructor";

    shortcutId!: number;

    constructor(args: { shortcutId?: number } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(18418929, false);
        writer.writeInt(this.shortcutId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputQuickReplyShortcutId {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        return new InputQuickReplyShortcutId(args);
    }
}