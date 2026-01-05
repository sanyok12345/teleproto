import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatMigrateTo extends TLObject {
    static CONSTRUCTOR_ID = 3775102866;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatMigrateTo";
    static classType = "constructor";

    channelId!: bigint;

    constructor(args: { channelId?: bigint } = {}) {
        super();
        this.channelId = args.channelId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3775102866, false);
        writer.writeLargeInt(this.channelId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatMigrateTo {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        return new MessageActionChatMigrateTo(args);
    }
}