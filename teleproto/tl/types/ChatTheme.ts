import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatTheme extends TLObject {
    static CONSTRUCTOR_ID = 3286236164;
    static SUBCLASS_OF_ID = 805087221;
    static className = "ChatTheme";
    static classType = "constructor";

    emoticon!: string;

    constructor(args: { emoticon?: string } = {}) {
        super();
        this.emoticon = args.emoticon!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3286236164, false);
        writer.tgWriteString(this.emoticon);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatTheme {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        return new ChatTheme(args);
    }
}