import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeQuickReply } from "./TypeQuickReply";

export class UpdateQuickReplies extends TLObject {
    static CONSTRUCTOR_ID = 4182182578;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateQuickReplies";
    static classType = "constructor";

    quickReplies!: TypeQuickReply[];

    constructor(args: { quickReplies?: TypeQuickReply[] } = {}) {
        super();
        this.quickReplies = args.quickReplies!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4182182578, false);
        writer.writeVector(this.quickReplies, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateQuickReplies {
        const args: any = {};
        const _quickReplies = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.quickReplies = _quickReplies;
        return new UpdateQuickReplies(args);
    }
}