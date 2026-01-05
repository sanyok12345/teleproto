import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsGiveawayWinnersOption } from "./TypeStarsGiveawayWinnersOption";

export class StarsGiveawayOption extends TLObject {
    static CONSTRUCTOR_ID = 2496562474;
    static SUBCLASS_OF_ID = 975741451;
    static className = "StarsGiveawayOption";
    static classType = "constructor";

    flags!: number;
    extended?: boolean;
    default?: boolean;
    stars!: bigint;
    yearlyBoosts!: number;
    storeProduct?: string;
    currency!: string;
    amount!: bigint;
    winners!: TypeStarsGiveawayWinnersOption[];

    constructor(args: { flags?: number, extended?: boolean, default?: boolean, stars?: bigint, yearlyBoosts?: number, storeProduct?: string, currency?: string, amount?: bigint, winners?: TypeStarsGiveawayWinnersOption[] } = {}) {
        super();
        this.flags = args.flags!;
        this.extended = args.extended;
        this.default = args.default;
        this.stars = args.stars!;
        this.yearlyBoosts = args.yearlyBoosts!;
        this.storeProduct = args.storeProduct;
        this.currency = args.currency!;
        this.amount = args.amount!;
        this.winners = args.winners!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2496562474, false);
        let flags = 0;
        if (this.extended) { flags |= 1 << 0; }
        if (this.default) { flags |= 1 << 1; }
        if (this.storeProduct !== undefined && this.storeProduct !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.extended !== undefined && this.extended !== null) {
        }
        if (this.default !== undefined && this.default !== null) {
        }
        writer.writeLargeInt(this.stars, 64);
        writer.writeInt(this.yearlyBoosts);
        if (this.storeProduct !== undefined && this.storeProduct !== null) {
            writer.tgWriteString(this.storeProduct);
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.amount, 64);
        writer.writeVector(this.winners, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsGiveawayOption {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _extended = true;
            args.extended = _extended;
        } else {
            args.extended = false;
        }
        if (args.flags & (1 << 1)) {
            const _default = true;
            args.default = _default;
        } else {
            args.default = false;
        }
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        const _yearlyBoosts = reader.readInt();
        args.yearlyBoosts = _yearlyBoosts;
        if (args.flags & (1 << 2)) {
            const _storeProduct = reader.tgReadString();
            args.storeProduct = _storeProduct;
        } else {
            args.storeProduct = undefined;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _amount = reader.readLargeInt(64);
        args.amount = _amount;
        const _winners = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.winners = _winners;
        return new StarsGiveawayOption(args);
    }
}