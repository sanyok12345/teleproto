import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateDeleteQuickReplyMessages extends TLObject {
    static CONSTRUCTOR_ID = 1450174413;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDeleteQuickReplyMessages";
    static classType = "constructor";

    shortcutId!: number;
    messages!: number[];

    constructor(args: { shortcutId?: number, messages?: number[] } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
        this.messages = args.messages!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1450174413, false);
        writer.writeInt(this.shortcutId);
        writer.writeVector(this.messages, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDeleteQuickReplyMessages {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _messages = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.messages = _messages;
        return new UpdateDeleteQuickReplyMessages(args);
    }
}