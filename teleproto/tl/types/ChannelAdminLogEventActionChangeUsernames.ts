import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelAdminLogEventActionChangeUsernames extends TLObject {
    static CONSTRUCTOR_ID = 4031755177;
    static SUBCLASS_OF_ID = 2998503411;
    static className = "ChannelAdminLogEventActionChangeUsernames";
    static classType = "constructor";

    prevValue!: string[];
    newValue!: string[];

    constructor(args: { prevValue?: string[], newValue?: string[] } = {}) {
        super();
        this.prevValue = args.prevValue!;
        this.newValue = args.newValue!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4031755177, false);
        writer.writeVector(this.prevValue, (item) => {
            writer.tgWriteString(item);
        });
        writer.writeVector(this.newValue, (item) => {
            writer.tgWriteString(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelAdminLogEventActionChangeUsernames {
        const args: any = {};
        const _prevValue = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.prevValue = _prevValue;
        const _newValue = reader.readVector((reader) => {
            const item = reader.tgReadString();
            return item;
        });
        args.newValue = _newValue;
        return new ChannelAdminLogEventActionChangeUsernames(args);
    }
}