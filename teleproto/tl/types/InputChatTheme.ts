import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputChatTheme extends TLObject {
    static CONSTRUCTOR_ID = 3376277852;
    static SUBCLASS_OF_ID = 1462324836;
    static className = "InputChatTheme";
    static classType = "constructor";

    emoticon!: string;

    constructor(args: { emoticon?: string } = {}) {
        super();
        this.emoticon = args.emoticon!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3376277852, false);
        writer.tgWriteString(this.emoticon);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputChatTheme {
        const args: any = {};
        const _emoticon = reader.tgReadString();
        args.emoticon = _emoticon;
        return new InputChatTheme(args);
    }
}