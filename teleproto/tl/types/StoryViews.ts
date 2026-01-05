import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReactionCount } from "./TypeReactionCount";

export class StoryViews extends TLObject {
    static CONSTRUCTOR_ID = 2371443926;
    static SUBCLASS_OF_ID = 1424272486;
    static className = "StoryViews";
    static classType = "constructor";

    flags!: number;
    hasViewers?: boolean;
    viewsCount!: number;
    forwardsCount?: number;
    reactions?: TypeReactionCount[];
    reactionsCount?: number;
    recentViewers?: bigint[];

    constructor(args: { flags?: number, hasViewers?: boolean, viewsCount?: number, forwardsCount?: number, reactions?: TypeReactionCount[], reactionsCount?: number, recentViewers?: bigint[] } = {}) {
        super();
        this.flags = args.flags!;
        this.hasViewers = args.hasViewers;
        this.viewsCount = args.viewsCount!;
        this.forwardsCount = args.forwardsCount;
        this.reactions = args.reactions;
        this.reactionsCount = args.reactionsCount;
        this.recentViewers = args.recentViewers;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2371443926, false);
        let flags = 0;
        if (this.hasViewers) { flags |= 1 << 1; }
        if (this.forwardsCount !== undefined && this.forwardsCount !== null) { flags |= 1 << 2; }
        if (this.reactions !== undefined && this.reactions !== null) { flags |= 1 << 3; }
        if (this.reactionsCount !== undefined && this.reactionsCount !== null) { flags |= 1 << 4; }
        if (this.recentViewers !== undefined && this.recentViewers !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.hasViewers !== undefined && this.hasViewers !== null) {
        }
        writer.writeInt(this.viewsCount);
        if (this.forwardsCount !== undefined && this.forwardsCount !== null) {
            writer.writeInt(this.forwardsCount);
        }
        if (this.reactions !== undefined && this.reactions !== null) {
            writer.writeVector(this.reactions, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.reactionsCount !== undefined && this.reactionsCount !== null) {
            writer.writeInt(this.reactionsCount);
        }
        if (this.recentViewers !== undefined && this.recentViewers !== null) {
            writer.writeVector(this.recentViewers, (item) => {
                writer.writeLargeInt(item, 64);
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryViews {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _hasViewers = true;
            args.hasViewers = _hasViewers;
        } else {
            args.hasViewers = false;
        }
        const _viewsCount = reader.readInt();
        args.viewsCount = _viewsCount;
        if (args.flags & (1 << 2)) {
            const _forwardsCount = reader.readInt();
            args.forwardsCount = _forwardsCount;
        } else {
            args.forwardsCount = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _reactions = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.reactions = _reactions;
        } else {
            args.reactions = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _reactionsCount = reader.readInt();
            args.reactionsCount = _reactionsCount;
        } else {
            args.reactionsCount = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _recentViewers = reader.readVector((reader) => {
                const item = reader.readLargeInt(64);
                return item;
            });
            args.recentViewers = _recentViewers;
        } else {
            args.recentViewers = undefined;
        }
        return new StoryViews(args);
    }
}