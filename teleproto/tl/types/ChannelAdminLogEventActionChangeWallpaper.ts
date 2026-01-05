import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWallPaper } from "./TypeWallPaper";

export class ChannelAdminLogEventActionChangeWallpaper extends TLObject {
    static CONSTRUCTOR_ID = 834362706;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeWallpaper";
    static classType = "constructor";

    prevValue!: TypeWallPaper;
    newValue!: TypeWallPaper;

    constructor(args: { prevValue?: TypeWallPaper, newValue?: TypeWallPaper } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(834362706, false);
        writer.write(this.prevValue.getBytes());
        writer.write(this.newValue.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeWallpaper {
        const args: any = {};
        const _prevValue = reader.tgReadObject();
        args.prevValue = _prevValue;
        const _newValue = reader.tgReadObject();
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangeWallpaper(args);
    }
}