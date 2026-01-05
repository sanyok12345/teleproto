import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputGroupCall } from "../../types/TypeInputGroupCall";
import { TypeTextWithEntities } from "../../types/TypeTextWithEntities";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendGroupCallMessage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2983269392;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "phone.SendGroupCallMessage";
    static classType = "request";

    flags?: number;
    call!: TypeInputGroupCall;
    randomId!: bigint;
    message!: TypeTextWithEntities;
    allowPaidStars?: bigint;
    sendAs?: EntityLike;

    constructor(args: { flags?: number, call?: TypeInputGroupCall, randomId?: bigint, message?: TypeTextWithEntities, allowPaidStars?: bigint, sendAs?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.call = args.call!;
        this.randomId = args.randomId!;
        this.message = args.message!;
        this.allowPaidStars = args.allowPaidStars;
        this.sendAs = args.sendAs;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2983269392, false);
        let flags = 0;
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) { flags |= 1 << 0; }
        if (this.sendAs !== undefined && this.sendAs !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        writer.write(this.call.getBytes());
        writer.writeLargeInt(this.randomId, 64);
        writer.write(this.message.getBytes());
        if (this.allowPaidStars !== undefined && this.allowPaidStars !== null) {
            writer.writeLargeInt(this.allowPaidStars, 64);
        }
        if (this.sendAs !== undefined && this.sendAs !== null) {
            writer.write((this.sendAs as any).getBytes());
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

    static fromReader(reader: BinaryReader): SendGroupCallMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _call = reader.tgReadObject();
        args.call = _call;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _message = reader.tgReadObject();
        args.message = _message;
        if (args.flags & (1 << 0)) {
            const _allowPaidStars = reader.readLargeInt(64);
            args.allowPaidStars = _allowPaidStars;
        } else {
            args.allowPaidStars = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _sendAs = reader.tgReadObject();
            args.sendAs = _sendAs;
        } else {
            args.sendAs = undefined;
        }
        return new SendGroupCallMessage(args);
    }
}