import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class WebPageNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1930545681;
    static SUBCLASS_OF_ID = 1437168769;
    static className = "WebPageNotModified";
    static classType = "constructor";

    flags!: number;
    cachedPageViews?: number;

    constructor(args: { flags?: number, cachedPageViews?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.cachedPageViews = args.cachedPageViews;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1930545681, false);
        let flags = 0;
        if (this.cachedPageViews !== undefined && this.cachedPageViews !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.cachedPageViews !== undefined && this.cachedPageViews !== null) {
            writer.writeInt(this.cachedPageViews);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebPageNotModified {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _cachedPageViews = reader.readInt();
            args.cachedPageViews = _cachedPageViews;
        } else {
            args.cachedPageViews = undefined;
        }
        return new WebPageNotModified(args);
    }
}