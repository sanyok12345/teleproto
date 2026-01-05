import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { MessageIDLike } from "../../types/../../define";
import { TypePaidReactionPrivacy } from "../../types/TypePaidReactionPrivacy";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendPaidReaction extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1488702288;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendPaidReaction";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    msgId?: MessageIDLike;
    count!: number;
    randomId!: bigint;
    private?: TypePaidReactionPrivacy;

    constructor(args: { flags?: number, peer?: EntityLike, msgId?: MessageIDLike, count?: number, randomId?: bigint, private?: TypePaidReactionPrivacy } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.msgId = args.msgId;
        this.count = args.count!;
        this.randomId = args.randomId!;
        this.private = args.private;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1488702288, false);
        let flags = 0;
        if (this.private !== undefined && this.private !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        if (typeof this.msgId! === 'number') {
            writer.writeInt(this.msgId!);
        } else {
            writer.writeInt((this.msgId! as any).id);
        }
        writer.writeInt(this.count);
        writer.writeLargeInt(this.randomId, 64);
        if (this.private !== undefined && this.private !== null) {
            writer.write(this.private.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendPaidReaction {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _msgId = reader.tgReadObject();
        args.msgId = _msgId;
        const _count = reader.readInt();
        args.count = _count;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        if (args.flags & (1 << 0)) {
            const _private = reader.tgReadObject();
            args.private = _private;
        } else {
            args.private = undefined;
        }
        return new SendPaidReaction(args);
    }
}