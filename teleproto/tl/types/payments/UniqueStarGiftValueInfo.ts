import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class UniqueStarGiftValueInfo extends TLObject {
    static CONSTRUCTOR_ID = 1362093126;
    static SUBCLASS_OF_ID = 372595652;
    static className = "payments.UniqueStarGiftValueInfo";
    static classType = "constructor";

    flags!: number;
    lastSaleOnFragment?: boolean;
    valueIsAverage?: boolean;
    currency!: string;
    value!: bigint;
    initialSaleDate!: number;
    initialSaleStars!: bigint;
    initialSalePrice!: bigint;
    lastSaleDate?: number;
    lastSalePrice?: bigint;
    floorPrice?: bigint;
    averagePrice?: bigint;
    listedCount?: number;
    fragmentListedCount?: number;
    fragmentListedUrl?: string;

    constructor(args: { flags?: number, lastSaleOnFragment?: boolean, valueIsAverage?: boolean, currency?: string, value?: bigint, initialSaleDate?: number, initialSaleStars?: bigint, initialSalePrice?: bigint, lastSaleDate?: number, lastSalePrice?: bigint, floorPrice?: bigint, averagePrice?: bigint, listedCount?: number, fragmentListedCount?: number, fragmentListedUrl?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.lastSaleOnFragment = args.lastSaleOnFragment;
        this.valueIsAverage = args.valueIsAverage;
        this.currency = args.currency!;
        this.value = args.value!;
        this.initialSaleDate = args.initialSaleDate!;
        this.initialSaleStars = args.initialSaleStars!;
        this.initialSalePrice = args.initialSalePrice!;
        this.lastSaleDate = args.lastSaleDate;
        this.lastSalePrice = args.lastSalePrice;
        this.floorPrice = args.floorPrice;
        this.averagePrice = args.averagePrice;
        this.listedCount = args.listedCount;
        this.fragmentListedCount = args.fragmentListedCount;
        this.fragmentListedUrl = args.fragmentListedUrl;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1362093126, false);
        let flags = 0;
        if (this.lastSaleOnFragment) { flags |= 1 << 1; }
        if (this.valueIsAverage) { flags |= 1 << 6; }
        if (this.lastSaleDate !== undefined && this.lastSaleDate !== null) { flags |= 1 << 0; }
        if (this.lastSalePrice !== undefined && this.lastSalePrice !== null) { flags |= 1 << 0; }
        if (this.floorPrice !== undefined && this.floorPrice !== null) { flags |= 1 << 2; }
        if (this.averagePrice !== undefined && this.averagePrice !== null) { flags |= 1 << 3; }
        if (this.listedCount !== undefined && this.listedCount !== null) { flags |= 1 << 4; }
        if (this.fragmentListedCount !== undefined && this.fragmentListedCount !== null) { flags |= 1 << 5; }
        if (this.fragmentListedUrl !== undefined && this.fragmentListedUrl !== null) { flags |= 1 << 5; }
        writer.writeInt(flags, false);
        if (this.lastSaleOnFragment !== undefined && this.lastSaleOnFragment !== null) {
        }
        if (this.valueIsAverage !== undefined && this.valueIsAverage !== null) {
        }
        writer.tgWriteString(this.currency);
        writer.writeLargeInt(this.value, 64);
        writer.writeInt(this.initialSaleDate);
        writer.writeLargeInt(this.initialSaleStars, 64);
        writer.writeLargeInt(this.initialSalePrice, 64);
        if (this.lastSaleDate !== undefined && this.lastSaleDate !== null) {
            writer.writeInt(this.lastSaleDate);
        }
        if (this.lastSalePrice !== undefined && this.lastSalePrice !== null) {
            writer.writeLargeInt(this.lastSalePrice, 64);
        }
        if (this.floorPrice !== undefined && this.floorPrice !== null) {
            writer.writeLargeInt(this.floorPrice, 64);
        }
        if (this.averagePrice !== undefined && this.averagePrice !== null) {
            writer.writeLargeInt(this.averagePrice, 64);
        }
        if (this.listedCount !== undefined && this.listedCount !== null) {
            writer.writeInt(this.listedCount);
        }
        if (this.fragmentListedCount !== undefined && this.fragmentListedCount !== null) {
            writer.writeInt(this.fragmentListedCount);
        }
        if (this.fragmentListedUrl !== undefined && this.fragmentListedUrl !== null) {
            writer.tgWriteString(this.fragmentListedUrl);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UniqueStarGiftValueInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _lastSaleOnFragment = true;
            args.lastSaleOnFragment = _lastSaleOnFragment;
        } else {
            args.lastSaleOnFragment = false;
        }
        if (args.flags & (1 << 6)) {
            const _valueIsAverage = true;
            args.valueIsAverage = _valueIsAverage;
        } else {
            args.valueIsAverage = false;
        }
        const _currency = reader.tgReadString();
        args.currency = _currency;
        const _value = reader.readLargeInt(64);
        args.value = _value;
        const _initialSaleDate = reader.readInt();
        args.initialSaleDate = _initialSaleDate;
        const _initialSaleStars = reader.readLargeInt(64);
        args.initialSaleStars = _initialSaleStars;
        const _initialSalePrice = reader.readLargeInt(64);
        args.initialSalePrice = _initialSalePrice;
        if (args.flags & (1 << 0)) {
            const _lastSaleDate = reader.readInt();
            args.lastSaleDate = _lastSaleDate;
        } else {
            args.lastSaleDate = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _lastSalePrice = reader.readLargeInt(64);
            args.lastSalePrice = _lastSalePrice;
        } else {
            args.lastSalePrice = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _floorPrice = reader.readLargeInt(64);
            args.floorPrice = _floorPrice;
        } else {
            args.floorPrice = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _averagePrice = reader.readLargeInt(64);
            args.averagePrice = _averagePrice;
        } else {
            args.averagePrice = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _listedCount = reader.readInt();
            args.listedCount = _listedCount;
        } else {
            args.listedCount = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _fragmentListedCount = reader.readInt();
            args.fragmentListedCount = _fragmentListedCount;
        } else {
            args.fragmentListedCount = undefined;
        }
        if (args.flags & (1 << 5)) {
            const _fragmentListedUrl = reader.tgReadString();
            args.fragmentListedUrl = _fragmentListedUrl;
        } else {
            args.fragmentListedUrl = undefined;
        }
        return new UniqueStarGiftValueInfo(args);
    }
}