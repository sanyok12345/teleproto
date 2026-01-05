import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeBusinessRecipients } from "./TypeBusinessRecipients";

export class BusinessGreetingMessage extends TLObject {
    static CONSTRUCTOR_ID = 3843664811;
    static SUBCLASS_OF_ID = 3007638222;
    static className = "BusinessGreetingMessage";
    static classType = "constructor";

    shortcutId!: number;
    recipients!: TypeBusinessRecipients;
    noActivityDays!: number;

    constructor(args: { shortcutId?: number, recipients?: TypeBusinessRecipients, noActivityDays?: number } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
        this.recipients = args.recipients!;
        this.noActivityDays = args.noActivityDays!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3843664811, false);
        writer.writeInt(this.shortcutId);
        writer.write(this.recipients.getBytes());
        writer.writeInt(this.noActivityDays);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BusinessGreetingMessage {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _recipients = reader.tgReadObject();
        args.recipients = _recipients;
        const _noActivityDays = reader.readInt();
        args.noActivityDays = _noActivityDays;
        return new BusinessGreetingMessage(args);
    }
}