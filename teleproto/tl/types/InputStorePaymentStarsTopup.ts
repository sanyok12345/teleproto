import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputStorePaymentStarsTopup extends TLObject {
    static CONSTRUCTOR_ID = 4188186315;
    static SUBCLASS_OF_ID = 3886290765;
    static className = "InputStorePaymentStarsTopup";
    static classType = "constructor";

    flags!: number;
    stars!: bigint;
    currency!: string;
    amount!: bigint;
    spendPurposePeer?: TypeInputPeer;

    constructor(args: { flags?: number, stars?: bigint, currency?: string, amount?: bigint, spendPurposePeer?: TypeInputPeer } = {}) {
        super();
        this.flags = args.flags!;
        this.stars = args.stars!;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.spendPurposePeer = args.spendPurposePeer;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4188186315, false);
        let flags = 0;
        if (this.spendPurposePeer !== undefined && this.spendPurposePeer !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.stars, 64);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        if (this.spendPurposePeer !== undefined && this.spendPurposePeer !== null) {
            writer.write(this.spendPurposePeer.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStorePaymentStarsTopup {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        if (args.flags & (1 << 0)) {
            const _spendPurposePeer = reader.tgReadObject();
            args.spendPurposePeer = _spendPurposePeer;
        } else {
            args.spendPurposePeer = undefined;
        }
        return new InputStorePaymentStarsTopup(args);
    }
}