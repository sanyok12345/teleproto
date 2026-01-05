import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DisallowedGiftsSettings extends TLObject {
    static CONSTRUCTOR_ID = 1911715524;
    static SUBCLASS_OF_ID = 58911147;
    static className = "DisallowedGiftsSettings";
    static classType = "constructor";

    flags!: number;
    disallowUnlimitedStargifts?: boolean;
    disallowLimitedStargifts?: boolean;
    disallowUniqueStargifts?: boolean;
    disallowPremiumGifts?: boolean;
    disallowStargiftsFromChannels?: boolean;

    constructor(args: { flags?: number, disallowUnlimitedStargifts?: boolean, disallowLimitedStargifts?: boolean, disallowUniqueStargifts?: boolean, disallowPremiumGifts?: boolean, disallowStargiftsFromChannels?: boolean } = {}) {
        super();
        this.flags = args.flags!;
        this.disallowUnlimitedStargifts = args.disallowUnlimitedStargifts;
        this.disallowLimitedStargifts = args.disallowLimitedStargifts;
        this.disallowUniqueStargifts = args.disallowUniqueStargifts;
        this.disallowPremiumGifts = args.disallowPremiumGifts;
        this.disallowStargiftsFromChannels = args.disallowStargiftsFromChannels;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1911715524, false);
        let flags = 0;
        if (this.disallowUnlimitedStargifts) { flags |= 1 << 0; }
        if (this.disallowLimitedStargifts) { flags |= 1 << 1; }
        if (this.disallowUniqueStargifts) { flags |= 1 << 2; }
        if (this.disallowPremiumGifts) { flags |= 1 << 3; }
        if (this.disallowStargiftsFromChannels) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.disallowUnlimitedStargifts !== undefined && this.disallowUnlimitedStargifts !== null) {
        }
        if (this.disallowLimitedStargifts !== undefined && this.disallowLimitedStargifts !== null) {
        }
        if (this.disallowUniqueStargifts !== undefined && this.disallowUniqueStargifts !== null) {
        }
        if (this.disallowPremiumGifts !== undefined && this.disallowPremiumGifts !== null) {
        }
        if (this.disallowStargiftsFromChannels !== undefined && this.disallowStargiftsFromChannels !== null) {
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DisallowedGiftsSettings {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _disallowUnlimitedStargifts = true;
            args.disallowUnlimitedStargifts = _disallowUnlimitedStargifts;
        } else {
            args.disallowUnlimitedStargifts = false;
        }
        if (args.flags & (1 << 1)) {
            const _disallowLimitedStargifts = true;
            args.disallowLimitedStargifts = _disallowLimitedStargifts;
        } else {
            args.disallowLimitedStargifts = false;
        }
        if (args.flags & (1 << 2)) {
            const _disallowUniqueStargifts = true;
            args.disallowUniqueStargifts = _disallowUniqueStargifts;
        } else {
            args.disallowUniqueStargifts = false;
        }
        if (args.flags & (1 << 3)) {
            const _disallowPremiumGifts = true;
            args.disallowPremiumGifts = _disallowPremiumGifts;
        } else {
            args.disallowPremiumGifts = false;
        }
        if (args.flags & (1 << 4)) {
            const _disallowStargiftsFromChannels = true;
            args.disallowStargiftsFromChannels = _disallowStargiftsFromChannels;
        } else {
            args.disallowStargiftsFromChannels = false;
        }
        return new DisallowedGiftsSettings(args);
    }
}