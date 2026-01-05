import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeChannelLocation } from "./TypeChannelLocation";

export class ChannelAdminLogEventActionChangeLocation extends TLObject {
    static CONSTRUCTOR_ID = 241923758;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeLocation";
    static classType = "constructor";

    prevValue!: TypeChannelLocation;
    newValue!: TypeChannelLocation;

    constructor(args: { prevValue?: TypeChannelLocation, newValue?: TypeChannelLocation } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(241923758, false);
        writer.write(this.prevValue.getBytes());
        writer.write(this.newValue.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeLocation {
        const args: any = {};
        const _prevValue = reader.tgReadObject();
        args.prevValue = _prevValue;
        const _newValue = reader.tgReadObject();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangeLocation(args);
    }
}