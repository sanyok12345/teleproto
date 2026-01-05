import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChat } from "./TypeChat";

export class PageBlockChannel extends TLObject {
    static CONSTRUCTOR_ID = 4011282869;
    static SUBCLASS_OF_ID = 449467972;
    static className = "PageBlockChannel";
    static classType = "constructor";

    channel!: TypeChat;

    constructor(args: { channel?: TypeChat } = {}) {
        super();
        this.channel = args.channel!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4011282869, false);
        writer.write(this.channel.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PageBlockChannel {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        return new PageBlockChannel(args);
    }
}