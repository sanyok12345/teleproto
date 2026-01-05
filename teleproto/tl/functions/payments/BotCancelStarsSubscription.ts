import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class BotCancelStarsSubscription extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1845102114;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "payments.BotCancelStarsSubscription";
    static classType = "request";

    flags?: number;
    restore?: boolean;
    userId!: EntityLike;
    chargeId!: string;

    constructor(args: { flags?: number, restore?: boolean, userId?: EntityLike, chargeId?: string } = {}) {
        super();
        this.flags = args.flags;
        this.restore = args.restore;
        this.userId = args.userId!;
        this.chargeId = args.chargeId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1845102114, false);
        let flags = 0;
        if (this.restore) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.restore !== undefined && this.restore !== null) {
        }
        writer.write((this.userId as any).getBytes());
        writer.tgWriteString(this.chargeId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): BotCancelStarsSubscription {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _restore = true;
            args.restore = _restore;
        } else {
            args.restore = false;
        }
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _chargeId = reader.tgReadString();
        args.chargeId = _chargeId;
        return new BotCancelStarsSubscription(args);
    }
}