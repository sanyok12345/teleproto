import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputStorePaymentPurpose } from "../../types/TypeInputStorePaymentPurpose";
import { TypeUpdates } from "../../types/TypeUpdates";

export class LaunchPrepaidGiveaway extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1609928480;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "payments.LaunchPrepaidGiveaway";
    static classType = "request";

    peer?: EntityLike;
    giveawayId!: bigint;
    purpose!: TypeInputStorePaymentPurpose;

    constructor(args: { peer?: EntityLike, giveawayId?: bigint, purpose?: TypeInputStorePaymentPurpose } = {}) {
        super();
        this.peer = args.peer;
        this.giveawayId = args.giveawayId!;
        this.purpose = args.purpose!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1609928480, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeLargeInt(this.giveawayId, 64);
        writer.write(this.purpose.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): LaunchPrepaidGiveaway {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _giveawayId = reader.readLargeInt(64);
        args.giveawayId = _giveawayId;
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        return new LaunchPrepaidGiveaway(args);
    }
}