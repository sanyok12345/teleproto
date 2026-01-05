import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPhoneCall } from "../../types/TypeInputPhoneCall";
import { TypePhoneCallDiscardReason } from "../../types/TypePhoneCallDiscardReason";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DiscardCall extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2999697856;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.DiscardCall";
    static classType = "request";

    flags?: number;
    video?: boolean;
    peer?: TypeInputPhoneCall;
    duration!: number;
    reason!: TypePhoneCallDiscardReason;
    connectionId!: bigint;

    constructor(args: { flags?: number, video?: boolean, peer?: TypeInputPhoneCall, duration?: number, reason?: TypePhoneCallDiscardReason, connectionId?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.video = args.video;
        this.peer = args.peer;
        this.duration = args.duration!;
        this.reason = args.reason!;
        this.connectionId = args.connectionId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2999697856, false);
        let flags = 0;
        if (this.video) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.video !== undefined && this.video !== null) {
        }
        writer.write(this.peer!.getBytes());
        writer.writeInt(this.duration);
        writer.write(this.reason.getBytes());
        writer.writeLargeInt(this.connectionId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DiscardCall {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _video = true;
            args.video = _video;
        } else {
            args.video = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _duration = reader.readInt();
        args.duration = _duration;
        const _reason = reader.tgReadObject();
        args.reason = _reason;
        const _connectionId = reader.readLargeInt(64);
        args.connectionId = _connectionId;
        return new DiscardCall(args);
    }
}