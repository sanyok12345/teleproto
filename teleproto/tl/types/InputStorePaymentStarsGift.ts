import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputUser } from "./TypeInputUser";

export class InputStorePaymentStarsGift extends TLObject {
    static CONSTRUCTOR_ID = 494149367;
    static SUBCLASS_OF_ID = 3886290765;
    static className = "InputStorePaymentStarsGift";
    static classType = "constructor";

    userId!: TypeInputUser;
    stars!: bigint;
    currency!: string;
    amount!: bigint;

    constructor(args: { userId?: TypeInputUser, stars?: bigint, currency?: string, amount?: bigint } = {}) {
        super();
        this.userId = args.userId!;
        this.stars = args.stars!;
        this.currency = args.currency!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(494149367, false);
        writer.write(this.userId.getBytes());
        writer.writeLargeInt(this.stars, 64);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStorePaymentStarsGift {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new InputStorePaymentStarsGift(args);
    }
}