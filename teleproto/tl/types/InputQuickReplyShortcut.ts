import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputQuickReplyShortcut extends TLObject {
    static CONSTRUCTOR_ID = 609840449;
    static SUBCLASS_OF_ID = 2775088215;
    static className = "InputQuickReplyShortcut";
    static classType = "constructor";

    shortcut!: string;

    constructor(args: { shortcut?: string } = {}) {
        super();
        this.shortcut = args.shortcut!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(609840449, false);
        writer.tgWriteString(this.shortcut);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputQuickReplyShortcut {
        const args: any = {};
        const _shortcut = reader.tgReadString();
        args.shortcut = _shortcut;
        return new InputQuickReplyShortcut(args);
    }
}