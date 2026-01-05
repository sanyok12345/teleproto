import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SendMessageEmojiInteractionSeen extends TLObject {
    static CONSTRUCTOR_ID = 3060109358;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageEmojiInteractionSeen";
    static classType = "constructor";

    emoticon!: string;

    constructor(args: { emoticon?: string } = {}) {
        super();
        this.emoticon = args.emoticon!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3060109358, false);
        writer.tgWriteString(this.emoticon);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageEmojiInteractionSeen {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        return new SendMessageEmojiInteractionSeen(args);
    }
}