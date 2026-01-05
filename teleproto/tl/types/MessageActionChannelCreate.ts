import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChannelCreate extends TLObject {
    static CONSTRUCTOR_ID = 2513611922;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChannelCreate";
    static classType = "constructor";

    title!: string;

    constructor(args: { title?: string } = {}) {
        super();
        this.title = args.title!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2513611922, false);
        writer.tgWriteString(this.title);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChannelCreate {
        const args: any = {};
        const _title = reader.tgReadString();
        args.title = _title;
        return new MessageActionChannelCreate(args);
    }
}