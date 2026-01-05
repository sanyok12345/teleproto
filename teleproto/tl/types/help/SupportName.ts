import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SupportName extends TLObject {
    static CONSTRUCTOR_ID = 2349199817;
    static SUBCLASS_OF_ID = 2135996354;
    static className = "help.SupportName";
    static classType = "constructor";

    name!: string;

    constructor(args: { name?: string } = {}) {
        super();
        this.name = args.name!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2349199817, false);
        writer.tgWriteString(this.name);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SupportName {
        const args: any = {};
        const _name = reader.tgReadString();
        args.name = _name;
        return new SupportName(args);
    }
}