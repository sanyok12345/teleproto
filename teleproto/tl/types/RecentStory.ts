import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RecentStory extends TLObject {
    static CONSTRUCTOR_ID = 1897752877;
    static SUBCLASS_OF_ID = 653372877;
    static className = "RecentStory";
    static classType = "constructor";

    flags!: number;
    live?: boolean;
    maxId?: number;

    constructor(args: { flags?: number, live?: boolean, maxId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.live = args.live;
        this.maxId = args.maxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1897752877, false);
        let flags = 0;
        if (this.live) { flags |= 1 << 0; }
        if (this.maxId !== undefined && this.maxId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.live !== undefined && this.live !== null) {
        }
        if (this.maxId !== undefined && this.maxId !== null) {
            writer.writeInt(this.maxId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RecentStory {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _live = true;
            args.live = _live;
        } else {
            args.live = false;
        }
        if (args.flags & (1 << 1)) {
            const _maxId = reader.readInt();
            args.maxId = _maxId;
        } else {
            args.maxId = undefined;
        }
        return new RecentStory(args);
    }
}