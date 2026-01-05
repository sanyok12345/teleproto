import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBusinessWeeklyOpen } from "./TypeBusinessWeeklyOpen";

export class BusinessWorkHours extends TLObject {
    static CONSTRUCTOR_ID = 2358423704;
    static SUBCLASS_OF_ID = 1704962053;
    static className = "BusinessWorkHours";
    static classType = "constructor";

    flags!: number;
    openNow?: boolean;
    timezoneId!: string;
    weeklyOpen!: TypeBusinessWeeklyOpen[];

    constructor(args: { flags?: number, openNow?: boolean, timezoneId?: string, weeklyOpen?: TypeBusinessWeeklyOpen[] } = {}) {
        super();
        this.flags = args.flags!;
        this.openNow = args.openNow;
        this.timezoneId = args.timezoneId!;
        this.weeklyOpen = args.weeklyOpen!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2358423704, false);
        let flags = 0;
        if (this.openNow) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.openNow !== undefined && this.openNow !== null) {
        }
        writer.tgWriteString(this.timezoneId);
        writer.writeVector(this.weeklyOpen, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessWorkHours {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _openNow = true;
            args.openNow = _openNow;
        } else {
            args.openNow = false;
        }
        const _timezoneId = reader.tgReadString();
        args.timezoneId = _timezoneId;
        const _weeklyOpen = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.weeklyOpen = _weeklyOpen;
        return new BusinessWorkHours(args);
    }
}