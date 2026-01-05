import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionToggleGroupCallSetting extends TLObject {
    static CONSTRUCTOR_ID = 1456906823;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionToggleGroupCallSetting";
    static classType = "constructor";

    joinMuted!: boolean;

    constructor(args: { joinMuted?: boolean } = {}) {
        super();
        this.joinMuted = args.joinMuted!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1456906823, false);
        writer.tgWriteBool(this.joinMuted);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionToggleGroupCallSetting {
        const args: any = {};
        const _joinMuted = reader.tgReadBool();
        args.joinMuted = _joinMuted;
        return new ChannelAdminLogEventActionToggleGroupCallSetting(args);
    }
}