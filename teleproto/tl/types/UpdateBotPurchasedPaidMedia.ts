import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateBotPurchasedPaidMedia extends TLObject {
    static CONSTRUCTOR_ID = 675009298;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotPurchasedPaidMedia";
    static classType = "constructor";

    userId!: bigint;
    payload!: string;
    qts!: number;

    constructor(args: { userId?: bigint, payload?: string, qts?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.payload = args.payload!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(675009298, false);
        writer.writeLargeInt(this.userId, 64);
        writer.tgWriteString(this.payload);
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotPurchasedPaidMedia {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _payload = reader.tgReadString();
        args.payload = _payload;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotPurchasedPaidMedia(args);
    }
}