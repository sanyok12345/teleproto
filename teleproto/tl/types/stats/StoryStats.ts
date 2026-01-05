import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStatsGraph } from "../TypeStatsGraph";

export class StoryStats extends TLObject {
    static CONSTRUCTOR_ID = 1355613820;
    static SUBCLASS_OF_ID = 2337096660;
    static className = "stats.StoryStats";
    static classType = "constructor";

    viewsGraph!: TypeStatsGraph;
    reactionsByEmotionGraph!: TypeStatsGraph;

    constructor(args: { viewsGraph?: TypeStatsGraph, reactionsByEmotionGraph?: TypeStatsGraph } = {}) {
        super();
        this.viewsGraph = args.viewsGraph!;
        this.reactionsByEmotionGraph = args.reactionsByEmotionGraph!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1355613820, false);
        writer.write(this.viewsGraph.getBytes());
        writer.write(this.reactionsByEmotionGraph.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StoryStats {
        const args: any = {};
        const _viewsGraph = reader.tgReadObject();
        args.viewsGraph = _viewsGraph;
        const _reactionsByEmotionGraph = reader.tgReadObject();
        args.reactionsByEmotionGraph = _reactionsByEmotionGraph;
        return new StoryStats(args);
    }
}