import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeKeyboardButtonRow } from "./TypeKeyboardButtonRow";

export class ReplyInlineMarkup extends TLObject {
    static CONSTRUCTOR_ID = 1218642516;
    static SUBCLASS_OF_ID = 3806400242;
    static className = "ReplyInlineMarkup";
    static classType = "constructor";

    rows!: TypeKeyboardButtonRow[];

    constructor(args: { rows?: TypeKeyboardButtonRow[] } = {}) {
        super();
        this.rows = args.rows!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1218642516, false);
        writer.writeVector(this.rows, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ReplyInlineMarkup {
        const args: any = {};
        const _rows = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rows = _rows;
        return new ReplyInlineMarkup(args);
    }
}