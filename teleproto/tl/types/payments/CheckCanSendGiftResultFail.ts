import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeTextWithEntities } from "../TypeTextWithEntities";

export class CheckCanSendGiftResultFail extends TLObject {
    static CONSTRUCTOR_ID = 3588588148;
    static SUBCLASS_OF_ID = 1664023088;
    static className = "payments.CheckCanSendGiftResultFail";
    static classType = "constructor";

    reason!: TypeTextWithEntities;

    constructor(args: { reason?: TypeTextWithEntities } = {}) {
        super();
        this.reason = args.reason!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3588588148, false);
        writer.write(this.reason.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CheckCanSendGiftResultFail {
        const args: any = {};
        const _reason = reader.tgReadObject();
        args.reason = _reason;
        return new CheckCanSendGiftResultFail(args);
    }
}