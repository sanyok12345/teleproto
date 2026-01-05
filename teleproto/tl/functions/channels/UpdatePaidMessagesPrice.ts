import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpdatePaidMessagesPrice extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1259483771;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.UpdatePaidMessagesPrice";
    static classType = "request";

    flags?: number;
    broadcastMessagesAllowed?: boolean;
    channel?: EntityLike;
    sendPaidMessagesStars!: bigint;

    constructor(args: { flags?: number, broadcastMessagesAllowed?: boolean, channel?: EntityLike, sendPaidMessagesStars?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.broadcastMessagesAllowed = args.broadcastMessagesAllowed;
        this.channel = args.channel;
        this.sendPaidMessagesStars = args.sendPaidMessagesStars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1259483771, false);
        let flags = 0;
        if (this.broadcastMessagesAllowed) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.broadcastMessagesAllowed !== undefined && this.broadcastMessagesAllowed !== null) {
        }
        writer.write((this.channel! as any).getBytes());
        writer.writeLargeInt(this.sendPaidMessagesStars, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdatePaidMessagesPrice {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _broadcastMessagesAllowed = true;
            args.broadcastMessagesAllowed = _broadcastMessagesAllowed;
        } else {
            args.broadcastMessagesAllowed = false;
        }
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _sendPaidMessagesStars = reader.readLargeInt(64);
        args.sendPaidMessagesStars = _sendPaidMessagesStars;
        return new UpdatePaidMessagesPrice(args);
    }
}