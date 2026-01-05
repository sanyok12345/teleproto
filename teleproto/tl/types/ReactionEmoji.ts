import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ReactionEmoji extends TLObject {
    static CONSTRUCTOR_ID = 455247544;
    static SUBCLASS_OF_ID = 1570858401;
    static className = "ReactionEmoji";
    static classType = "constructor";

    emoticon!: string;

    constructor(args: { emoticon?: string } = {}) {
        super();
        this.emoticon = args.emoticon!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(455247544, false);
        writer.tgWriteString(this.emoticon);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReactionEmoji {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        return new ReactionEmoji(args);
    }
}