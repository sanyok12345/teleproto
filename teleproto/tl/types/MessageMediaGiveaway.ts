import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageMediaGiveaway extends TLObject {
    static CONSTRUCTOR_ID = 2852600811;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaGiveaway";
    static classType = "constructor";

    flags!: number;
    onlyNewSubscribers?: boolean;
    winnersAreVisible?: boolean;
    channels!: bigint[];
    countriesIso2?: string[];
    prizeDescription?: string;
    quantity!: number;
    months?: number;
    stars?: bigint;
    untilDate!: number;

    constructor(args: { flags?: number, onlyNewSubscribers?: boolean, winnersAreVisible?: boolean, channels?: bigint[], countriesIso2?: string[], prizeDescription?: string, quantity?: number, months?: number, stars?: bigint, untilDate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.onlyNewSubscribers = args.onlyNewSubscribers;
        this.winnersAreVisible = args.winnersAreVisible;
        this.channels = args.channels!;
        this.countriesIso2 = args.countriesIso2;
        this.prizeDescription = args.prizeDescription;
        this.quantity = args.quantity!;
        this.months = args.months;
        this.stars = args.stars;
        this.untilDate = args.untilDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2852600811, false);
        let flags = 0;
        if (this.onlyNewSubscribers) { flags |= 1 << 0; }
        if (this.winnersAreVisible) { flags |= 1 << 2; }
        if (this.countriesIso2 !== undefined && this.countriesIso2 !== null) { flags |= 1 << 1; }
        if (this.prizeDescription !== undefined && this.prizeDescription !== null) { flags |= 1 << 3; }
        if (this.months !== undefined && this.months !== null) { flags |= 1 << 4; }
        if (this.stars !== undefined && this.stars !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.onlyNewSubscribers !== undefined && this.onlyNewSubscribers !== null) {
        }
        if (this.winnersAreVisible !== undefined && this.winnersAreVisible !== null) {
        }
        writer.writeVector(this.channels, (item) => {
            writer.writeLargeInt(item, 64);
        });
        if (this.countriesIso2 !== undefined && this.countriesIso2 !== null) {
            writer.writeVector(this.countriesIso2, (item) => {
                writer.tgWriteString(item);
            });
        }
        if (this.prizeDescription !== undefined && this.prizeDescription !== null) {
            writer.tgWriteString(this.prizeDescription);
        }
        writer.writeInt(this.quantity);
        if (this.months !== undefined && this.months !== null) {
            writer.writeInt(this.months);
        }
        if (this.stars !== undefined && this.stars !== null) {
            writer.writeLargeInt(this.stars, 64);
        }
        writer.writeInt(this.untilDate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaGiveaway {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _onlyNewSubscribers = true;
            args.onlyNewSubscribers = _onlyNewSubscribers;
        } else {
            args.onlyNewSubscribers = false;
        }
        if (args.flags & (1 << 2)) {
            const _winnersAreVisible = true;
            args.winnersAreVisible = _winnersAreVisible;
        } else {
            args.winnersAreVisible = false;
        }
        const _channels = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.channels = _channels;
        if (args.flags & (1 << 1)) {
            const _countriesIso2 = reader.readVector((reader) => {
                const item = reader.tgReadString();
                return item;
            });
            args.countriesIso2 = _countriesIso2;
        } else {
            args.countriesIso2 = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _prizeDescription = reader.tgReadString();
            args.prizeDescription = _prizeDescription;
        } else {
            args.prizeDescription = undefined;
        }
        const _quantity = reader.readInt();
        args.quantity = _quantity;
        if (args.flags & (1 << 4)) {
            const _months = reader.readInt();
            args.months = _months;
        } else {
            args.months = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _stars = reader.readLargeInt(64);
            args.stars = _stars;
        } else {
            args.stars = undefined;
        }
        const _untilDate = reader.readInt();
        args.untilDate = _untilDate;
        return new MessageMediaGiveaway(args);
    }
}