import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeSendMessageAction } from "../../types/TypeSendMessageAction";

export class SetTyping extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1486110434;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetTyping";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    topMsgId?: number;
    action!: TypeSendMessageAction;

    constructor(args: { flags?: number, peer?: EntityLike, topMsgId?: number, action?: TypeSendMessageAction } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.topMsgId = args.topMsgId;
        this.action = args.action!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1486110434, false);
        let flags = 0;
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        writer.write(this.action.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetTyping {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        const _action = reader.tgReadObject();
        args.action = _action;
        return new SetTyping(args);
    }
}