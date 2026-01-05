import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarGiftUpgradePrice extends TLObject {
    static CONSTRUCTOR_ID = 2582262557;
    static SUBCLASS_OF_ID = 4099078244;
    static className = "StarGiftUpgradePrice";
    static classType = "constructor";

    date!: number;
    upgradeStars!: bigint;

    constructor(args: { date?: number, upgradeStars?: bigint } = {}) {
        super();
        this.date = args.date!;
        this.upgradeStars = args.upgradeStars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2582262557, false);
        writer.writeInt(this.date);
        writer.writeLargeInt(this.upgradeStars, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarGiftUpgradePrice {
        const args: any = {};
        const _date = reader.readInt();
        args.date = _date;
        const _upgradeStars = reader.readLargeInt(64);
        args.upgradeStars = _upgradeStars;
        return new StarGiftUpgradePrice(args);
    }
}