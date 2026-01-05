import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeCheckCanSendGiftResult } from "../../types/payments/TypeCheckCanSendGiftResult";

export class CheckCanSendGift extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3234131401;
    static SUBCLASS_OF_ID = 1664023088;
    static className = "payments.CheckCanSendGift";
    static classType = "request";

    giftId!: bigint;

    constructor(args: { giftId?: bigint } = {}) {
        super();
        this.giftId = args.giftId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3234131401, false);
        writer.writeLargeInt(this.giftId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeCheckCanSendGiftResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckCanSendGift {
        const args: any = {};
        const _giftId = reader.readLargeInt(64);
        args.giftId = _giftId;
        return new CheckCanSendGift(args);
    }
}