import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionChatJoinedByLink extends TLObject {
    static CONSTRUCTOR_ID = 51520707;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionChatJoinedByLink";
    static classType = "constructor";

    inviterId!: bigint;

    constructor(args: { inviterId?: bigint } = {}) {
        super();
        this.inviterId = args.inviterId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(51520707, false);
        writer.writeLargeInt(this.inviterId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionChatJoinedByLink {
        const args: any = {};
        const _inviterId = reader.readLargeInt(64);
        args.inviterId = _inviterId;
        return new MessageActionChatJoinedByLink(args);
    }
}