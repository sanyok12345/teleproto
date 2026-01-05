import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatEditTitle extends TLObject {
    static CONSTRUCTOR_ID = 3047280218;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatEditTitle";
    static classType = "constructor";

    title!: string;

    constructor(args: { title?: string } = {}) {
        super();
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3047280218, false);
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatEditTitle {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        return new MessageActionChatEditTitle(args);
    }
}