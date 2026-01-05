import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionChangeAbout extends TLObject {
    static CONSTRUCTOR_ID = 1427671598;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeAbout";
    static classType = "constructor";

    prevValue!: string;
    newValue!: string;

    constructor(args: { prevValue?: string, newValue?: string } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1427671598, false);
        writer.tgWriteString(this.prevValue);
        writer.tgWriteString(this.newValue);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeAbout {
        const args: any = {};
        const _prevValue = reader.tgReadString();
        args.prevValue = _prevValue;
        const _newValue = reader.tgReadString();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangeAbout(args);
    }
}