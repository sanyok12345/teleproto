import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDcOption } from "./TypeDcOption";

export class UpdateDcOptions extends TLObject {
    static CONSTRUCTOR_ID = 2388564083;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDcOptions";
    static classType = "constructor";

    dcOptions!: TypeDcOption[];

    constructor(args: { dcOptions?: TypeDcOption[] } = {}) {
        super();
        this.dcOptions = args.dcOptions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2388564083, false);
        writer.writeVector(this.dcOptions, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDcOptions {
        const args: any = {};
        const _dcOptions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.dcOptions = _dcOptions;
        return new UpdateDcOptions(args);
    }
}