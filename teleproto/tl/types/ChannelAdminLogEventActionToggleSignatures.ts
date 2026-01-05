import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionToggleSignatures extends TLObject {
    static CONSTRUCTOR_ID = 648939889;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionToggleSignatures";
    static classType = "constructor";

    newValue!: boolean;

    constructor(args: { newValue?: boolean } = {}) {
        super();
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(648939889, false);
        writer.tgWriteBool(this.newValue);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionToggleSignatures {
        const args: any = {};
        const _newValue = reader.tgReadBool();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionToggleSignatures(args);
    }
}