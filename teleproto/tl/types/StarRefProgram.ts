import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeStarsAmount } from "./TypeStarsAmount";

export class StarRefProgram extends TLObject {
    static CONSTRUCTOR_ID = 3708577522;
    static SUBCLASS_OF_ID = 2559107074;
    static className = "StarRefProgram";
    static classType = "constructor";

    flags!: number;
    botId!: bigint;
    commissionPermille!: number;
    durationMonths?: number;
    endDate?: number;
    dailyRevenuePerUser?: TypeStarsAmount;

    constructor(args: { flags?: number, botId?: bigint, commissionPermille?: number, durationMonths?: number, endDate?: number, dailyRevenuePerUser?: TypeStarsAmount } = {}) {
        super();
        this.flags = args.flags!;
        this.botId = args.botId!;
        this.commissionPermille = args.commissionPermille!;
        this.durationMonths = args.durationMonths;
        this.endDate = args.endDate;
        this.dailyRevenuePerUser = args.dailyRevenuePerUser;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3708577522, false);
        let flags = 0;
        if (this.durationMonths !== undefined && this.durationMonths !== null) { flags |= 1 << 0; }
        if (this.endDate !== undefined && this.endDate !== null) { flags |= 1 << 1; }
        if (this.dailyRevenuePerUser !== undefined && this.dailyRevenuePerUser !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.botId, 64);
        writer.writeInt(this.commissionPermille);
        if (this.durationMonths !== undefined && this.durationMonths !== null) {
            writer.writeInt(this.durationMonths);
        }
        if (this.endDate !== undefined && this.endDate !== null) {
            writer.writeInt(this.endDate);
        }
        if (this.dailyRevenuePerUser !== undefined && this.dailyRevenuePerUser !== null) {
            writer.write(this.dailyRevenuePerUser.getBytes());
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarRefProgram {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _botId = reader.readLargeInt(64);
        args.botId = _botId;
        const _commissionPermille = reader.readInt();
        args.commissionPermille = _commissionPermille;
        if (args.flags & (1 << 0)) {
            const _durationMonths = reader.readInt();
            args.durationMonths = _durationMonths;
        } else {
            args.durationMonths = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _endDate = reader.readInt();
            args.endDate = _endDate;
        } else {
            args.endDate = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _dailyRevenuePerUser = reader.tgReadObject();
            args.dailyRevenuePerUser = _dailyRevenuePerUser;
        } else {
            args.dailyRevenuePerUser = undefined;
        }
        return new StarRefProgram(args);
    }
}