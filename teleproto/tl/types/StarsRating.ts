import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StarsRating extends TLObject {
    static CONSTRUCTOR_ID = 453922567;
    static SUBCLASS_OF_ID = 1668506656;
    static className = "StarsRating";
    static classType = "constructor";

    flags!: number;
    level!: number;
    currentLevelStars!: bigint;
    stars!: bigint;
    nextLevelStars?: bigint;

    constructor(args: { flags?: number, level?: number, currentLevelStars?: bigint, stars?: bigint, nextLevelStars?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.level = args.level!;
        this.currentLevelStars = args.currentLevelStars!;
        this.stars = args.stars!;
        this.nextLevelStars = args.nextLevelStars;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(453922567, false);
        let flags = 0;
        if (this.nextLevelStars !== undefined && this.nextLevelStars !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.level);
        writer.writeLargeInt(this.currentLevelStars, 64);
        writer.writeLargeInt(this.stars, 64);
        if (this.nextLevelStars !== undefined && this.nextLevelStars !== null) {
            writer.writeLargeInt(this.nextLevelStars, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StarsRating {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _level = reader.readInt();
        args.level = _level;
        const _currentLevelStars = reader.readLargeInt(64);
        args.currentLevelStars = _currentLevelStars;
        const _stars = reader.readLargeInt(64);
        args.stars = _stars;
        if (args.flags & (1 << 0)) {
            const _nextLevelStars = reader.readLargeInt(64);
            args.nextLevelStars = _nextLevelStars;
        } else {
            args.nextLevelStars = undefined;
        }
        return new StarsRating(args);
    }
}