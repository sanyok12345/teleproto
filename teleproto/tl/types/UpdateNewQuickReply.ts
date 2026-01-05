import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeQuickReply } from "./TypeQuickReply";

export class UpdateNewQuickReply extends TLObject {
    static CONSTRUCTOR_ID = 4114458391;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateNewQuickReply";
    static classType = "constructor";

    quickReply!: TypeQuickReply;

    constructor(args: { quickReply?: TypeQuickReply } = {}) {
        super();
        this.quickReply = args.quickReply!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4114458391, false);
        writer.write(this.quickReply.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateNewQuickReply {
        const args: any = {};
        const _quickReply = reader.tgReadObject();
        args.quickReply = _quickReply;
        return new UpdateNewQuickReply(args);
    }
}