import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdatePhoneCallSignalingData extends TLObject {
    static CONSTRUCTOR_ID = 643940105;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePhoneCallSignalingData";
    static classType = "constructor";

    phoneCallId!: bigint;
    data!: Buffer;

    constructor(args: { phoneCallId?: bigint, data?: Buffer } = {}) {
        super();
        this.phoneCallId = args.phoneCallId!;
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(643940105, false);
        writer.writeLargeInt(this.phoneCallId, 64);
        writer.tgWriteBytes(this.data);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePhoneCallSignalingData {
        const args: any = {};
        const _phoneCallId = reader.readLargeInt(64);
        args.phoneCallId = _phoneCallId;
        const _data = reader.tgReadBytes();
        args.data = _data;
        return new UpdatePhoneCallSignalingData(args);
    }
}