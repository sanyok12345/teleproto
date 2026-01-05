import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChatTheme } from "./TypeChatTheme";

export class MessageActionSetChatTheme extends TLObject {
    static CONSTRUCTOR_ID = 3105602874;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSetChatTheme";
    static classType = "constructor";

    theme!: TypeChatTheme;

    constructor(args: { theme?: TypeChatTheme } = {}) {
        super();
        this.theme = args.theme!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3105602874, false);
        writer.write(this.theme.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSetChatTheme {
        const args: any = {};
        const _theme = reader.tgReadObject();
        args.theme = _theme;
        return new MessageActionSetChatTheme(args);
    }
}