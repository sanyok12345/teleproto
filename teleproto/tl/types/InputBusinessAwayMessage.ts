import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBusinessAwayMessageSchedule } from "./TypeBusinessAwayMessageSchedule";
import { TypeInputBusinessRecipients } from "./TypeInputBusinessRecipients";

export class InputBusinessAwayMessage extends TLObject {
    static CONSTRUCTOR_ID = 2200008160;
    static SUBCLASS_OF_ID = 3629489271;
    static className = "InputBusinessAwayMessage";
    static classType = "constructor";

    flags!: number;
    offlineOnly?: boolean;
    shortcutId!: number;
    schedule!: TypeBusinessAwayMessageSchedule;
    recipients!: TypeInputBusinessRecipients;

    constructor(args: { flags?: number, offlineOnly?: boolean, shortcutId?: number, schedule?: TypeBusinessAwayMessageSchedule, recipients?: TypeInputBusinessRecipients } = {}) {
        super();
        this.flags = args.flags!;
        this.offlineOnly = args.offlineOnly;
        this.shortcutId = args.shortcutId!;
        this.schedule = args.schedule!;
        this.recipients = args.recipients!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2200008160, false);
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

    static fromReader(reader: BinaryReader): InputBusinessAwayMessage {
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
        return new InputBusinessAwayMessage(args);
    }
}