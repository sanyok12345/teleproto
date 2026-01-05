import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStarGiftAttribute } from "../TypeStarGiftAttribute";
import { TypeStarGiftUpgradePrice } from "../TypeStarGiftUpgradePrice";

export class StarGiftUpgradePreview extends TLObject {
    static CONSTRUCTOR_ID = 1038213101;
    static SUBCLASS_OF_ID = 1579903175;
    static className = "payments.StarGiftUpgradePreview";
    static classType = "constructor";

    sampleAttributes!: TypeStarGiftAttribute[];
    prices!: TypeStarGiftUpgradePrice[];
    nextPrices!: TypeStarGiftUpgradePrice[];

    constructor(args: { sampleAttributes?: TypeStarGiftAttribute[], prices?: TypeStarGiftUpgradePrice[], nextPrices?: TypeStarGiftUpgradePrice[] } = {}) {
        super();
        this.sampleAttributes = args.sampleAttributes!;
        this.prices = args.prices!;
        this.nextPrices = args.nextPrices!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1038213101, false);
        writer.writeVector(this.sampleAttributes, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.prices, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.nextPrices, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftUpgradePreview {
        const args: any = {};
        const _sampleAttributes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.sampleAttributes = _sampleAttributes;
        const _prices = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.prices = _prices;
        const _nextPrices = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.nextPrices = _nextPrices;
        return new StarGiftUpgradePreview(args);
    }
}