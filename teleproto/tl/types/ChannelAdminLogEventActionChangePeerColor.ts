import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeerColor } from "./TypePeerColor";

export class ChannelAdminLogEventActionChangePeerColor extends TLObject {
    static CONSTRUCTOR_ID = 1469507456;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangePeerColor";
    static classType = "constructor";

    prevValue!: TypePeerColor;
    newValue!: TypePeerColor;

    constructor(args: { prevValue?: TypePeerColor, newValue?: TypePeerColor } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1469507456, false);
        writer.write(this.prevValue.getBytes());
        writer.write(this.newValue.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangePeerColor {
        const args: any = {};
        const _prevValue = reader.tgReadObject();
        args.prevValue = _prevValue;
        const _newValue = reader.tgReadObject();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangePeerColor(args);
    }
}