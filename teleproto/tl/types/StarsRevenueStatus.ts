import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class StarsRevenueStatus extends TLObject {
    static CONSTRUCTOR_ID = 4273886353;
    static SUBCLASS_OF_ID = 1031643121;
    static className = "StarsRevenueStatus";
    static classType = "constructor";

    flags!: number;
    withdrawalEnabled?: boolean;
    currentBalance!: TypeStarsAmount;
    availableBalance!: TypeStarsAmount;
    overallRevenue!: TypeStarsAmount;
    nextWithdrawalAt?: number;

    constructor(args: { flags?: number, withdrawalEnabled?: boolean, currentBalance?: TypeStarsAmount, availableBalance?: TypeStarsAmount, overallRevenue?: TypeStarsAmount, nextWithdrawalAt?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.withdrawalEnabled = args.withdrawalEnabled;
        this.currentBalance = args.currentBalance!;
        this.availableBalance = args.availableBalance!;
        this.overallRevenue = args.overallRevenue!;
        this.nextWithdrawalAt = args.nextWithdrawalAt;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4273886353, false);
        let flags = 0;
        if (this.withdrawalEnabled) { flags |= 1 << 0; }
        if (this.nextWithdrawalAt !== undefined && this.nextWithdrawalAt !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.withdrawalEnabled !== undefined && this.withdrawalEnabled !== null) {
        }
        writer.write(this.currentBalance.getBytes());
        writer.write(this.availableBalance.getBytes());
        writer.write(this.overallRevenue.getBytes());
        if (this.nextWithdrawalAt !== undefined && this.nextWithdrawalAt !== null) {
            writer.writeInt(this.nextWithdrawalAt);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsRevenueStatus {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _withdrawalEnabled = true;
            args.withdrawalEnabled = _withdrawalEnabled;
        } else {
            args.withdrawalEnabled = false;
        }
        const _currentBalance = reader.tgReadObject();
        args.currentBalance = _currentBalance;
        const _availableBalance = reader.tgReadObject();
        args.availableBalance = _availableBalance;
        const _overallRevenue = reader.tgReadObject();
        args.overallRevenue = _overallRevenue;
        if (args.flags & (1 << 1)) {
            const _nextWithdrawalAt = reader.readInt();
            args.nextWithdrawalAt = _nextWithdrawalAt;
        } else {
            args.nextWithdrawalAt = undefined;
        }
        return new StarsRevenueStatus(args);
    }
}