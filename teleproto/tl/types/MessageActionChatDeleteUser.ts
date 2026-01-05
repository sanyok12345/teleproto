import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatDeleteUser extends TLObject {
    static CONSTRUCTOR_ID = 2755604684;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatDeleteUser";
    static classType = "constructor";

    userId!: bigint;

    constructor(args: { userId?: bigint } = {}) {
        super();
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2755604684, false);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatDeleteUser {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new MessageActionChatDeleteUser(args);
    }
}