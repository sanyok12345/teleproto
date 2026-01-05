import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeSendMessageAction } from "./TypeSendMessageAction";

export class UpdateUserTyping extends TLObject {
    static CONSTRUCTOR_ID = 706199388;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateUserTyping";
    static classType = "constructor";

    flags!: number;
    userId!: bigint;
    topMsgId?: number;
    action!: TypeSendMessageAction;

    constructor(args: { flags?: number, userId?: bigint, topMsgId?: number, action?: TypeSendMessageAction } = {}) {
        super();
        this.flags = args.flags!;
        this.userId = args.userId!;
        this.topMsgId = args.topMsgId;
        this.action = args.action!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(706199388, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.userId, 64);
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        writer.write(this.action.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateUserTyping {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        const _action = reader.tgReadObject();
        args.action = _action;
        return new UpdateUserTyping(args);
    }
}