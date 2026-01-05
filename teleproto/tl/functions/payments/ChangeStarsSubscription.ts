import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class ChangeStarsSubscription extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3346466936;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.ChangeStarsSubscription";
    static classType = "request";

    flags?: number;
    peer?: EntityLike;
    subscriptionId!: string;
    canceled?: boolean;

    constructor(args: { flags?: number, peer?: EntityLike, subscriptionId?: string, canceled?: boolean } = {}) {
        super();
        this.flags = args.flags;
        this.peer = args.peer;
        this.subscriptionId = args.subscriptionId!;
        this.canceled = args.canceled;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3346466936, false);
        let flags = 0;
        if (this.canceled !== undefined && this.canceled !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write((this.peer! as any).getBytes());
        writer.tgWriteString(this.subscriptionId);
        if (this.canceled !== undefined && this.canceled !== null) {
            writer.tgWriteBool(this.canceled);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ChangeStarsSubscription {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _subscriptionId = reader.tgReadString();
        args.subscriptionId = _subscriptionId;
        if (args.flags & (1 << 0)) {
            const _canceled = reader.tgReadBool();
            args.canceled = _canceled;
        } else {
            args.canceled = undefined;
        }
        return new ChangeStarsSubscription(args);
    }
}