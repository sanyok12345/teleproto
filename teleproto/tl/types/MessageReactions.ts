import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeReactionCount } from "./TypeReactionCount";
import { TypeMessagePeerReaction } from "./TypeMessagePeerReaction";
import { TypeMessageReactor } from "./TypeMessageReactor";

export class MessageReactions extends TLObject {
    static CONSTRUCTOR_ID = 171155211;
    static SUBCLASS_OF_ID = 2321221404;
    static className = "MessageReactions";
    static classType = "constructor";

    flags!: number;
    min?: boolean;
    canSeeList?: boolean;
    reactionsAsTags?: boolean;
    results!: TypeReactionCount[];
    recentReactions?: TypeMessagePeerReaction[];
    topReactors?: TypeMessageReactor[];

    constructor(args: { flags?: number, min?: boolean, canSeeList?: boolean, reactionsAsTags?: boolean, results?: TypeReactionCount[], recentReactions?: TypeMessagePeerReaction[], topReactors?: TypeMessageReactor[] } = {}) {
        super();
        this.flags = args.flags!;
        this.min = args.min;
        this.canSeeList = args.canSeeList;
        this.reactionsAsTags = args.reactionsAsTags;
        this.results = args.results!;
        this.recentReactions = args.recentReactions;
        this.topReactors = args.topReactors;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(171155211, false);
        let flags = 0;
        if (this.min) { flags |= 1 << 0; }
        if (this.canSeeList) { flags |= 1 << 2; }
        if (this.reactionsAsTags) { flags |= 1 << 3; }
        if (this.recentReactions !== undefined && this.recentReactions !== null) { flags |= 1 << 1; }
        if (this.topReactors !== undefined && this.topReactors !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.min !== undefined && this.min !== null) {
        }
        if (this.canSeeList !== undefined && this.canSeeList !== null) {
        }
        if (this.reactionsAsTags !== undefined && this.reactionsAsTags !== null) {
        }
        writer.writeVector(this.results, (item) => {
            writer.write(item.getBytes());
        });
        if (this.recentReactions !== undefined && this.recentReactions !== null) {
            writer.writeVector(this.recentReactions, (item) => {
                writer.write(item.getBytes());
            });
        }
        if (this.topReactors !== undefined && this.topReactors !== null) {
            writer.writeVector(this.topReactors, (item) => {
                writer.write(item.getBytes());
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageReactions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _min = true;
            args.min = _min;
        } else {
            args.min = false;
        }
        if (args.flags & (1 << 2)) {
            const _canSeeList = true;
            args.canSeeList = _canSeeList;
        } else {
            args.canSeeList = false;
        }
        if (args.flags & (1 << 3)) {
            const _reactionsAsTags = true;
            args.reactionsAsTags = _reactionsAsTags;
        } else {
            args.reactionsAsTags = false;
        }
        const _results = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.results = _results;
        if (args.flags & (1 << 1)) {
            const _recentReactions = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.recentReactions = _recentReactions;
        } else {
            args.recentReactions = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _topReactors = reader.readVector((reader) => {
                const item = reader.tgReadObject();
                return item;
            });
            args.topReactors = _topReactors;
        } else {
            args.topReactors = undefined;
        }
        return new MessageReactions(args);
    }
}