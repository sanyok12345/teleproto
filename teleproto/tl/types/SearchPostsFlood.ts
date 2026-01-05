import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class SearchPostsFlood extends TLObject {
    static CONSTRUCTOR_ID = 1040931690;
    static SUBCLASS_OF_ID = 3267415233;
    static className = "SearchPostsFlood";
    static classType = "constructor";

    flags!: number;
    queryIsFree?: boolean;
    totalDaily!: number;
    remains!: number;
    waitTill?: number;
    starsAmount!: bigint;

    constructor(args: { flags?: number, queryIsFree?: boolean, totalDaily?: number, remains?: number, waitTill?: number, starsAmount?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.queryIsFree = args.queryIsFree;
        this.totalDaily = args.totalDaily!;
        this.remains = args.remains!;
        this.waitTill = args.waitTill;
        this.starsAmount = args.starsAmount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1040931690, false);
        let flags = 0;
        if (this.queryIsFree) { flags |= 1 << 0; }
        if (this.waitTill !== undefined && this.waitTill !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.queryIsFree !== undefined && this.queryIsFree !== null) {
        }
        writer.writeInt(this.totalDaily);
        writer.writeInt(this.remains);
        if (this.waitTill !== undefined && this.waitTill !== null) {
            writer.writeInt(this.waitTill);
        }
        writer.writeLargeInt(this.starsAmount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SearchPostsFlood {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _queryIsFree = true;
            args.queryIsFree = _queryIsFree;
        } else {
            args.queryIsFree = false;
        }
        const _totalDaily = reader.readInt();
        args.totalDaily = _totalDaily;
        const _remains = reader.readInt();
        args.remains = _remains;
        if (args.flags & (1 << 1)) {
            const _waitTill = reader.readInt();
            args.waitTill = _waitTill;
        } else {
            args.waitTill = undefined;
        }
        const _starsAmount = reader.readLargeInt(64);
        args.starsAmount = _starsAmount;
        return new SearchPostsFlood(args);
    }
}