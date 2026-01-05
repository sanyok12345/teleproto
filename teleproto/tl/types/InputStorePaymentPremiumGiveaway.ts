import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputPeer } from "./TypeInputPeer";

export class InputStorePaymentPremiumGiveaway extends TLObject {
    static CONSTRUCTOR_ID = 369444042;
    static SUBCLASS_OF_ID = 3886290765;
    static className = "InputStorePaymentPremiumGiveaway";
    static classType = "constructor";

    flags!: number;
    onlyNewSubscribers?: boolean;
    winnersAreVisible?: boolean;
    boostPeer!: TypeInputPeer;
    additionalPeers?: TypeInputPeer[];
    countriesIso2?: string[];
    prizeDescription?: string;
    randomId!: bigint;
    untilDate!: number;
    currency!: string;
    amount!: bigint;

    constructor(args: { flags?: number, onlyNewSubscribers?: boolean, winnersAreVisible?: boolean, boostPeer?: TypeInputPeer, additionalPeers?: TypeInputPeer[], countriesIso2?: string[], prizeDescription?: string, randomId?: bigint, untilDate?: number, currency?: string, amount?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.onlyNewSubscribers = args.onlyNewSubscribers;
        this.winnersAreVisible = args.winnersAreVisible;
        this.boostPeer = args.boostPeer!;
        this.additionalPeers = args.additionalPeers;
        this.countriesIso2 = args.countriesIso2;
        this.prizeDescription = args.prizeDescription;
        this.randomId = args.randomId!;
        this.untilDate = args.untilDate!;
        this.currency = args.currency!;
        this.amount = args.amount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(369444042, false);
        let flags = 0;
        if (this.onlyNewSubscribers) { flags |= 1 << 0; }
        if (this.winnersAreVisible) { flags |= 1 << 3; }
        if (this.additionalPeers !== undefined && this.additionalPeers !== null) { flags |= 1 << 1; }
        if (this.countriesIso2 !== undefined && this.countriesIso2 !== null) { flags |= 1 << 2; }
        if (this.prizeDescription !== undefined && this.prizeDescription !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.onlyNewSubscribers !== undefined && this.onlyNewSubscribers !== null) {
        }
        if (this.winnersAreVisible !== undefined && this.winnersAreVisible !== null) {
        }
        writer.write(this.boostPeer.getBytes());
        if (this.additionalPeers !== undefined && this.additionalPeers !== null) {
            writer.writeVector(this.additionalPeers, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.countriesIso2 !== undefined && this.countriesIso2 !== null) {
            writer.writeVector(this.countriesIso2, (item) => {
                writer.tgWriteString(item);
            });
        }
        if (this.prizeDescription !== undefined && this.prizeDescription !== null) {
            writer.tgWriteString(this.prizeDescription);
        }
        writer.writeLargeInt(this.randomId, 64);
        writer.writeInt(this.untilDate);
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputStorePaymentPremiumGiveaway {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _onlyNewSubscribers = true;
            args.onlyNewSubscribers = _onlyNewSubscribers;
        } else {
            args.onlyNewSubscribers = false;
        }
        if (args.flags & (1 << 3)) {
            const _winnersAreVisible = true;
            args.winnersAreVisible = _winnersAreVisible;
        } else {
            args.winnersAreVisible = false;
        }
        const _boostPeer = reader.tgReadObject();
        args.boostPeer = _boostPeer;
        if (args.flags & (1 << 1)) {
            const _additionalPeers = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.additionalPeers = _additionalPeers;
        } else {
            args.additionalPeers = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _countriesIso2 = reader.readVector((reader) => {
                const item = reader.tgReadString();
                return item;
            });
            args.countriesIso2 = _countriesIso2;
        } else {
            args.countriesIso2 = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _prizeDescription = reader.tgReadString();
            args.prizeDescription = _prizeDescription;
        } else {
            args.prizeDescription = undefined;
        }
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        const _untilDate = reader.readInt();
        args.untilDate = _untilDate;
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        return new InputStorePaymentPremiumGiveaway(args);
    }
}