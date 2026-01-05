import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RestrictionReason extends TLObject {
    static CONSTRUCTOR_ID = 3497176244;
    static SUBCLASS_OF_ID = 112039341;
    static className = "RestrictionReason";
    static classType = "constructor";

    platform!: string;
    reason!: string;
    text!: string;

    constructor(args: { platform?: string, reason?: string, text?: string } = {}) {
        super();
        this.platform = args.platform!;
        this.reason = args.reason!;
        this.text = args.text!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3497176244, false);
        writer.tgWriteString(this.platform);
        writer.tgWriteString(this.reason);
        writer.tgWriteString(this.text);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RestrictionReason {
        const args: any = {};
        const _platform = reader.tgReadString();
        args.platform = _platform;
        const _reason = reader.tgReadString();
        args.reason = _reason;
        const _text = reader.tgReadString();
        args.text = _text;
        return new RestrictionReason(args);
    }
}