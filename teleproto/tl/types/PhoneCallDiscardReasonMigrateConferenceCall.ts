import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PhoneCallDiscardReasonMigrateConferenceCall extends TLObject {
    static CONSTRUCTOR_ID = 2679894519;
    static SUBCLASS_OF_ID = 3634081085;
    static className = "PhoneCallDiscardReasonMigrateConferenceCall";
    static classType = "constructor";

    slug!: string;

    constructor(args: { slug?: string } = {}) {
        super();
        this.slug = args.slug!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2679894519, false);
        writer.tgWriteString(this.slug);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PhoneCallDiscardReasonMigrateConferenceCall {
        const args: any = {};
        const _slug = reader.tgReadString();
        args.slug = _slug;
        return new PhoneCallDiscardReasonMigrateConferenceCall(args);
    }
}