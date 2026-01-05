import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeLabeledPrice } from "./TypeLabeledPrice";

export class ShippingOption extends TLObject {
    static CONSTRUCTOR_ID = 3055631583;
    static SUBCLASS_OF_ID = 4108930168;
    static className = "ShippingOption";
    static classType = "constructor";

    id!: string;
    title!: string;
    prices!: TypeLabeledPrice[];

    constructor(args: { id?: string, title?: string, prices?: TypeLabeledPrice[] } = {}) {
        super();
        this.id = args.id!;
        this.title = args.title!;
        this.prices = args.prices!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3055631583, false);
        writer.tgWriteString(this.id);
        writer.tgWriteString(this.title);
        writer.writeVector(this.prices, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ShippingOption {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        const _title = reader.tgReadString();
        args.title = _title;
        const _prices = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.prices = _prices;
        return new ShippingOption(args);
    }
}