import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputReplyTo } from "../../types/TypeInputReplyTo";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendScreenshotNotification extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2705348631;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendScreenshotNotification";
    static classType = "request";

    peer?: EntityLike;
    replyTo!: TypeInputReplyTo;
    randomId!: bigint;

    constructor(args: { peer?: EntityLike, replyTo?: TypeInputReplyTo, randomId?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.replyTo = args.replyTo!;
        this.randomId = args.randomId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2705348631, false);
        writer.write((this.peer! as any).getBytes());
        writer.write(this.replyTo.getBytes());
        writer.writeLargeInt(this.randomId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendScreenshotNotification {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _replyTo = reader.tgReadObject();
        args.replyTo = _replyTo;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        return new SendScreenshotNotification(args);
    }
}