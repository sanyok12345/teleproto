import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeInputBusinessRecipients } from "./TypeInputBusinessRecipients";

export class InputBusinessGreetingMessage extends TLObject {
    static CONSTRUCTOR_ID = 26528571;
    static SUBCLASS_OF_ID = 1652088029;
    static className = "InputBusinessGreetingMessage";
    static classType = "constructor";

    shortcutId!: number;
    recipients!: TypeInputBusinessRecipients;
    noActivityDays!: number;

    constructor(args: { shortcutId?: number, recipients?: TypeInputBusinessRecipients, noActivityDays?: number } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
        this.recipients = args.recipients!;
        this.noActivityDays = args.noActivityDays!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(26528571, false);
        writer.writeInt(this.shortcutId);
        writer.write(this.recipients.getBytes());
        writer.writeInt(this.noActivityDays);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputBusinessGreetingMessage {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _recipients = reader.tgReadObject();
        args.recipients = _recipients;
        const _noActivityDays = reader.readInt();
        args.noActivityDays = _noActivityDays;
        return new InputBusinessGreetingMessage(args);
    }
}