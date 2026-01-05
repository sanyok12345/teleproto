import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { MessageIDLike } from "./../../define";
import { TypeDataJSON } from "./TypeDataJSON";

export class SendMessageEmojiInteraction extends TLObject {
    static CONSTRUCTOR_ID = 630664139;
    static SUBCLASS_OF_ID = 548588577;
    static className = "SendMessageEmojiInteraction";
    static classType = "constructor";

    emoticon!: string;
    msgId!: MessageIDLike;
    interaction!: TypeDataJSON;

    constructor(args: { emoticon?: string, msgId?: MessageIDLike, interaction?: TypeDataJSON } = {}) {
        super();
        this.emoticon = args.emoticon!;
        this.msgId = args.msgId!;
        this.interaction = args.interaction!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(630664139, false);
        writer.tgWriteString(this.emoticon);
        if (typeof this.msgId === 'number') {
            writer.writeInt(this.msgId);
        } else {
            writer.writeInt((this.msgId as any).id);
        }
        writer.write(this.interaction.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SendMessageEmojiInteraction {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _interaction = reader.tgReadObject();
        args.interaction = _interaction;
        return new SendMessageEmojiInteraction(args);
    }
}