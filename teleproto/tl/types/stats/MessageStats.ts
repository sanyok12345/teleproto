import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStatsGraph } from "../TypeStatsGraph";

export class MessageStats extends TLObject {
    static CONSTRUCTOR_ID = 2145983508;
    static SUBCLASS_OF_ID = 2516886306;
    static className = "stats.MessageStats";
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
        writer.writeInt(2145983508, false);
        writer.write(this.viewsGraph.getBytes());
        writer.write(this.reactionsByEmotionGraph.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageStats {
        const args: any = {};
        const _viewsGraph = reader.tgReadObject();
        args.viewsGraph = _viewsGraph;
        const _reactionsByEmotionGraph = reader.tgReadObject();
        args.reactionsByEmotionGraph = _reactionsByEmotionGraph;
        return new MessageStats(args);
    }
}