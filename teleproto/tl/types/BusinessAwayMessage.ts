import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBusinessAwayMessageSchedule } from "./TypeBusinessAwayMessageSchedule";
import { TypeBusinessRecipients } from "./TypeBusinessRecipients";

export class BusinessAwayMessage extends TLObject {
    static CONSTRUCTOR_ID = 4011158108;
    static SUBCLASS_OF_ID = 4057181732;
    static className = "BusinessAwayMessage";
    static classType = "constructor";

    flags!: number;
    offlineOnly?: boolean;
    shortcutId!: number;
    schedule!: TypeBusinessAwayMessageSchedule;
    recipients!: TypeBusinessRecipients;

    constructor(args: { flags?: number, offlineOnly?: boolean, shortcutId?: number, schedule?: TypeBusinessAwayMessageSchedule, recipients?: TypeBusinessRecipients } = {}) {
        super();
        this.flags = args.flags!;
        this.offlineOnly = args.offlineOnly;
        this.shortcutId = args.shortcutId!;
        this.schedule = args.schedule!;
        this.recipients = args.recipients!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4011158108, false);
        let flags = 0;
        if (this.offlineOnly) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.offlineOnly !== undefined && this.offlineOnly !== null) {
        }
        writer.writeInt(this.shortcutId);
        writer.write(this.schedule.getBytes());
        writer.write(this.recipients.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessAwayMessage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _offlineOnly = true;
            args.offlineOnly = _offlineOnly;
        } else {
            args.offlineOnly = false;
        }
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _schedule = reader.tgReadObject();
        args.schedule = _schedule;
        const _recipients = reader.tgReadObject();
        args.recipients = _recipients;
        return new BusinessAwayMessage(args);
    }
}