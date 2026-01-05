import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class RefundStarsCharge extends MTProtoRequest {
    static CONSTRUCTOR_ID = 632196938;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.RefundStarsCharge";
    static classType = "request";

    userId!: EntityLike;
    chargeId!: string;

    constructor(args: { userId?: EntityLike, chargeId?: string } = {}) {
        super();
        this.userId = args.userId!;
        this.chargeId = args.chargeId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(632196938, false);
        writer.write((this.userId as any).getBytes());
        writer.tgWriteString(this.chargeId);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RefundStarsCharge {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _chargeId = reader.tgReadString();
        args.chargeId = _chargeId;
        return new RefundStarsCharge(args);
    }
}