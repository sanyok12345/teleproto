import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateDialogFilterOrder extends TLObject {
    static CONSTRUCTOR_ID = 2782339333;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateDialogFilterOrder";
    static classType = "constructor";

    order!: number[];

    constructor(args: { order?: number[] } = {}) {
        super();
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2782339333, false);
        writer.writeVector(this.order, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateDialogFilterOrder {
        const args: any = {};
        const _order = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.order = _order;
        return new UpdateDialogFilterOrder(args);
    }
}