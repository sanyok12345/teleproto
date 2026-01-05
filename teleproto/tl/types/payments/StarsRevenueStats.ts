import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStatsGraph } from "../TypeStatsGraph";
import { TypeStarsRevenueStatus } from "../TypeStarsRevenueStatus";

export class StarsRevenueStats extends TLObject {
    static CONSTRUCTOR_ID = 1814066038;
    static SUBCLASS_OF_ID = 2772915699;
    static className = "payments.StarsRevenueStats";
    static classType = "constructor";

    flags!: number;
    topHoursGraph?: TypeStatsGraph;
    revenueGraph!: TypeStatsGraph;
    status!: TypeStarsRevenueStatus;
    usdRate!: number;

    constructor(args: { flags?: number, topHoursGraph?: TypeStatsGraph, revenueGraph?: TypeStatsGraph, status?: TypeStarsRevenueStatus, usdRate?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.topHoursGraph = args.topHoursGraph;
        this.revenueGraph = args.revenueGraph!;
        this.status = args.status!;
        this.usdRate = args.usdRate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1814066038, false);
        let flags = 0;
        if (this.topHoursGraph !== undefined && this.topHoursGraph !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.topHoursGraph !== undefined && this.topHoursGraph !== null) {
            writer.write(this.topHoursGraph.getBytes());
        }
        writer.write(this.revenueGraph.getBytes());
        writer.write(this.status.getBytes());
        writer.writeDouble(this.usdRate);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsRevenueStats {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _topHoursGraph = reader.tgReadObject();
            args.topHoursGraph = _topHoursGraph;
        } else {
            args.topHoursGraph = undefined;
        }
        const _revenueGraph = reader.tgReadObject();
        args.revenueGraph = _revenueGraph;
        const _status = reader.tgReadObject();
        args.status = _status;
        const _usdRate = reader.readDouble();
        args.usdRate = _usdRate;
        return new StarsRevenueStats(args);
    }
}