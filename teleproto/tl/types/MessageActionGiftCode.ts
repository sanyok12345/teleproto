import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";
import { TypeTextWithEntities } from "./TypeTextWithEntities";

export class MessageActionGiftCode extends TLObject {
    static CONSTRUCTOR_ID = 834962247;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGiftCode";
    static classType = "constructor";

    flags!: number;
    viaGiveaway?: boolean;
    unclaimed?: boolean;
    boostPeer?: TypePeer;
    days!: number;
    slug!: string;
    currency?: string;
    amount?: bigint;
    cryptoCurrency?: string;
    cryptoAmount?: bigint;
    message?: TypeTextWithEntities;

    constructor(args: { flags?: number, viaGiveaway?: boolean, unclaimed?: boolean, boostPeer?: TypePeer, days?: number, slug?: string, currency?: string, amount?: bigint, cryptoCurrency?: string, cryptoAmount?: bigint, message?: TypeTextWithEntities } = {}) {
        super();
        this.flags = args.flags!;
        this.viaGiveaway = args.viaGiveaway;
        this.unclaimed = args.unclaimed;
        this.boostPeer = args.boostPeer;
        this.days = args.days!;
        this.slug = args.slug!;
        this.currency = args.currency;
        this.amount = args.amount;
        this.cryptoCurrency = args.cryptoCurrency;
        this.cryptoAmount = args.cryptoAmount;
        this.message = args.message;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(834962247, false);
        let flags = 0;
        if (this.viaGiveaway) { flags |= 1 << 0; }
        if (this.unclaimed) { flags |= 1 << 5; }
        if (this.boostPeer !== undefined && this.boostPeer !== null) { flags |= 1 << 1; }
        if (this.currency !== undefined && this.currency !== null) { flags |= 1 << 2; }
        if (this.amount !== undefined && this.amount !== null) { flags |= 1 << 2; }
        if (this.cryptoCurrency !== undefined && this.cryptoCurrency !== null) { flags |= 1 << 3; }
        if (this.cryptoAmount !== undefined && this.cryptoAmount !== null) { flags |= 1 << 3; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.viaGiveaway !== undefined && this.viaGiveaway !== null) {
        }
        if (this.unclaimed !== undefined && this.unclaimed !== null) {
        }
        if (this.boostPeer !== undefined && this.boostPeer !== null) {
            writer.write(this.boostPeer.getBytes());
        }
        writer.writeInt(this.days);
        writer.tgWriteString(this.slug);
        if (this.currency !== undefined && this.currency !== null) {
            writer.tgWriteString(this.currency);
        }
        if (this.amount !== undefined && this.amount !== null) {
            writer.writeLargeInt(this.amount, 64);
        }
        if (this.cryptoCurrency !== undefined && this.cryptoCurrency !== null) {
            writer.tgWriteString(this.cryptoCurrency);
        }
        if (this.cryptoAmount !== undefined && this.cryptoAmount !== null) {
            writer.writeLargeInt(this.cryptoAmount, 64);
        }
        if (this.message !== undefined && this.message !== null) {
            writer.write(this.message.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGiftCode {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _viaGiveaway = true;
            args.viaGiveaway = _viaGiveaway;
        } else {
            args.viaGiveaway = false;
        }
        if (args.flags & (1 << 5)) {
            const _unclaimed = true;
            args.unclaimed = _unclaimed;
        } else {
            args.unclaimed = false;
        }
        if (args.flags & (1 << 1)) {
            const _boostPeer = reader.tgReadObject();
            args.boostPeer = _boostPeer;
        } else {
            args.boostPeer = undefined;
        }
        const _days = reader.readInt();
        args.days = _days;
        const _slug = reader.tgReadString();
        args.slug = _slug;
        if (args.flags & (1 << 2)) {
            const _currency = reader.tgReadString();
            args.currency = _currency;
        } else {
            args.currency = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _amount = reader.readLargeInt(64);
            args.amount = _amount;
        } else {
            args.amount = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _cryptoCurrency = reader.tgReadString();
            args.cryptoCurrency = _cryptoCurrency;
        } else {
            args.cryptoCurrency = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _cryptoAmount = reader.readLargeInt(64);
            args.cryptoAmount = _cryptoAmount;
        } else {
            args.cryptoAmount = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _message = reader.tgReadObject();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        return new MessageActionGiftCode(args);
    }
}