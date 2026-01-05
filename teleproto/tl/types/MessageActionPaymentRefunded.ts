import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypePaymentCharge } from "./TypePaymentCharge";

export class MessageActionPaymentRefunded extends TLObject {
    static CONSTRUCTOR_ID = 1102307842;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionPaymentRefunded";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    currency!: string;
    totalAmount!: bigint;
    payload?: Buffer;
    charge!: TypePaymentCharge;

    constructor(args: { flags?: number, peer?: TypePeer, currency?: string, totalAmount?: bigint, payload?: Buffer, charge?: TypePaymentCharge } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.currency = args.currency!;
        this.totalAmount = args.totalAmount!;
        this.payload = args.payload;
        this.charge = args.charge!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1102307842, false);
        let flags = 0;
        if (this.payload !== undefined && this.payload !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.totalAmount, 64);
        if (this.payload !== undefined && this.payload !== null) {
            writer.tgWriteBytes(this.payload);
        }
        writer.write(this.charge.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionPaymentRefunded {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _totalAmount = reader.readLargeInt(64);
        args.totalAmount = _totalAmount;
        if (args.flags & (1 << 0)) {
            const _payload = reader.tgReadBytes();
            args.payload = _payload;
        } else {
            args.payload = undefined;
        }
        const _charge = reader.tgReadObject();
        args.charge = _charge;
        return new MessageActionPaymentRefunded(args);
    }
}