import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputStorePaymentAuthCode extends TLObject {
    static CONSTRUCTOR_ID = 2612159341;
    static SUBCLASS_OF_ID = 3886290765;
    static className = "InputStorePaymentAuthCode";
    static classType = "constructor";

    flags!: number;
    restore?: boolean;
    phoneNumber!: string;
    phoneCodeHash!: string;
    currency!: string;
    amount!: bigint;

    constructor(args: { flags?: number, restore?: boolean, phoneNumber?: string, phoneCodeHash?: string, currency?: string, amount?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.restore = args.restore;
        this.phoneNumber = args.phoneNumber!;
        this.phoneCodeHash = args.phoneCodeHash!;
        this.currency = args.currency!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2612159341, false);
        let flags = 0;
        if (this.restore) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.restore !== undefined && this.restore !== null) {
        }
        writer.tgWriteString(this.phoneNumber);
        writer.tgWriteString(this.phoneCodeHash);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStorePaymentAuthCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _restore = true;
            args.restore = _restore;
        } else {
            args.restore = false;
        }
        const _phoneNumber = reader.tgReadString();
        args.phoneNumber = _phoneNumber;
        const _phoneCodeHash = reader.tgReadString();
        args.phoneCodeHash = _phoneCodeHash;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new InputStorePaymentAuthCode(args);
    }
}