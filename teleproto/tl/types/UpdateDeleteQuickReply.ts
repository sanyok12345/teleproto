import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateDeleteQuickReply extends TLObject {
    static CONSTRUCTOR_ID = 1407644140;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDeleteQuickReply";
    static classType = "constructor";

    shortcutId!: number;

    constructor(args: { shortcutId?: number } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1407644140, false);
        writer.writeInt(this.shortcutId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDeleteQuickReply {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        return new UpdateDeleteQuickReply(args);
    }
}