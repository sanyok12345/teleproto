import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionToggleSlowMode extends TLObject {
    static CONSTRUCTOR_ID = 1401984889;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionToggleSlowMode";
    static classType = "constructor";

    prevValue!: number;
    newValue!: number;

    constructor(args: { prevValue?: number, newValue?: number } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1401984889, false);
        writer.writeInt(this.prevValue);
        writer.writeInt(this.newValue);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionToggleSlowMode {
        const args: any = {};
        const _prevValue = reader.readInt();
        args.prevValue = _prevValue;
        const _newValue = reader.readInt();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionToggleSlowMode(args);
    }
}