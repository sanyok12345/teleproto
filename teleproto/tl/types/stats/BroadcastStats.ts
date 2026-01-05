import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStatsDateRangeDays } from "../TypeStatsDateRangeDays";
import { TypeStatsAbsValueAndPrev } from "../TypeStatsAbsValueAndPrev";
import { TypeStatsPercentValue } from "../TypeStatsPercentValue";
import { TypeStatsGraph } from "../TypeStatsGraph";
import { TypePostInteractionCounters } from "../TypePostInteractionCounters";

export class BroadcastStats extends TLObject {
    static CONSTRUCTOR_ID = 963421692;
    static SUBCLASS_OF_ID = 2146587688;
    static className = "stats.BroadcastStats";
    static classType = "constructor";

    period!: TypeStatsDateRangeDays;
    followers!: TypeStatsAbsValueAndPrev;
    viewsPerPost!: TypeStatsAbsValueAndPrev;
    sharesPerPost!: TypeStatsAbsValueAndPrev;
    reactionsPerPost!: TypeStatsAbsValueAndPrev;
    viewsPerStory!: TypeStatsAbsValueAndPrev;
    sharesPerStory!: TypeStatsAbsValueAndPrev;
    reactionsPerStory!: TypeStatsAbsValueAndPrev;
    enabledNotifications!: TypeStatsPercentValue;
    growthGraph!: TypeStatsGraph;
    followersGraph!: TypeStatsGraph;
    muteGraph!: TypeStatsGraph;
    topHoursGraph!: TypeStatsGraph;
    interactionsGraph!: TypeStatsGraph;
    ivInteractionsGraph!: TypeStatsGraph;
    viewsBySourceGraph!: TypeStatsGraph;
    newFollowersBySourceGraph!: TypeStatsGraph;
    languagesGraph!: TypeStatsGraph;
    reactionsByEmotionGraph!: TypeStatsGraph;
    storyInteractionsGraph!: TypeStatsGraph;
    storyReactionsByEmotionGraph!: TypeStatsGraph;
    recentPostsInteractions!: TypePostInteractionCounters[];

    constructor(args: { period?: TypeStatsDateRangeDays, followers?: TypeStatsAbsValueAndPrev, viewsPerPost?: TypeStatsAbsValueAndPrev, sharesPerPost?: TypeStatsAbsValueAndPrev, reactionsPerPost?: TypeStatsAbsValueAndPrev, viewsPerStory?: TypeStatsAbsValueAndPrev, sharesPerStory?: TypeStatsAbsValueAndPrev, reactionsPerStory?: TypeStatsAbsValueAndPrev, enabledNotifications?: TypeStatsPercentValue, growthGraph?: TypeStatsGraph, followersGraph?: TypeStatsGraph, muteGraph?: TypeStatsGraph, topHoursGraph?: TypeStatsGraph, interactionsGraph?: TypeStatsGraph, ivInteractionsGraph?: TypeStatsGraph, viewsBySourceGraph?: TypeStatsGraph, newFollowersBySourceGraph?: TypeStatsGraph, languagesGraph?: TypeStatsGraph, reactionsByEmotionGraph?: TypeStatsGraph, storyInteractionsGraph?: TypeStatsGraph, storyReactionsByEmotionGraph?: TypeStatsGraph, recentPostsInteractions?: TypePostInteractionCounters[] } = {}) {
        super();
        this.period = args.period!;
        this.followers = args.followers!;
        this.viewsPerPost = args.viewsPerPost!;
        this.sharesPerPost = args.sharesPerPost!;
        this.reactionsPerPost = args.reactionsPerPost!;
        this.viewsPerStory = args.viewsPerStory!;
        this.sharesPerStory = args.sharesPerStory!;
        this.reactionsPerStory = args.reactionsPerStory!;
        this.enabledNotifications = args.enabledNotifications!;
        this.growthGraph = args.growthGraph!;
        this.followersGraph = args.followersGraph!;
        this.muteGraph = args.muteGraph!;
        this.topHoursGraph = args.topHoursGraph!;
        this.interactionsGraph = args.interactionsGraph!;
        this.ivInteractionsGraph = args.ivInteractionsGraph!;
        this.viewsBySourceGraph = args.viewsBySourceGraph!;
        this.newFollowersBySourceGraph = args.newFollowersBySourceGraph!;
        this.languagesGraph = args.languagesGraph!;
        this.reactionsByEmotionGraph = args.reactionsByEmotionGraph!;
        this.storyInteractionsGraph = args.storyInteractionsGraph!;
        this.storyReactionsByEmotionGraph = args.storyReactionsByEmotionGraph!;
        this.recentPostsInteractions = args.recentPostsInteractions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(963421692, false);
        writer.write(this.period.getBytes());
        writer.write(this.followers.getBytes());
        writer.write(this.viewsPerPost.getBytes());
        writer.write(this.sharesPerPost.getBytes());
        writer.write(this.reactionsPerPost.getBytes());
        writer.write(this.viewsPerStory.getBytes());
        writer.write(this.sharesPerStory.getBytes());
        writer.write(this.reactionsPerStory.getBytes());
        writer.write(this.enabledNotifications.getBytes());
        writer.write(this.growthGraph.getBytes());
        writer.write(this.followersGraph.getBytes());
        writer.write(this.muteGraph.getBytes());
        writer.write(this.topHoursGraph.getBytes());
        writer.write(this.interactionsGraph.getBytes());
        writer.write(this.ivInteractionsGraph.getBytes());
        writer.write(this.viewsBySourceGraph.getBytes());
        writer.write(this.newFollowersBySourceGraph.getBytes());
        writer.write(this.languagesGraph.getBytes());
        writer.write(this.reactionsByEmotionGraph.getBytes());
        writer.write(this.storyInteractionsGraph.getBytes());
        writer.write(this.storyReactionsByEmotionGraph.getBytes());
        writer.writeVector(this.recentPostsInteractions, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BroadcastStats {
        const args: any = {};
        const _period = reader.tgReadObject();
        args.period = _period;
        const _followers = reader.tgReadObject();
        args.followers = _followers;
        const _viewsPerPost = reader.tgReadObject();
        args.viewsPerPost = _viewsPerPost;
        const _sharesPerPost = reader.tgReadObject();
        args.sharesPerPost = _sharesPerPost;
        const _reactionsPerPost = reader.tgReadObject();
        args.reactionsPerPost = _reactionsPerPost;
        const _viewsPerStory = reader.tgReadObject();
        args.viewsPerStory = _viewsPerStory;
        const _sharesPerStory = reader.tgReadObject();
        args.sharesPerStory = _sharesPerStory;
        const _reactionsPerStory = reader.tgReadObject();
        args.reactionsPerStory = _reactionsPerStory;
        const _enabledNotifications = reader.tgReadObject();
        args.enabledNotifications = _enabledNotifications;
        const _growthGraph = reader.tgReadObject();
        args.growthGraph = _growthGraph;
        const _followersGraph = reader.tgReadObject();
        args.followersGraph = _followersGraph;
        const _muteGraph = reader.tgReadObject();
        args.muteGraph = _muteGraph;
        const _topHoursGraph = reader.tgReadObject();
        args.topHoursGraph = _topHoursGraph;
        const _interactionsGraph = reader.tgReadObject();
        args.interactionsGraph = _interactionsGraph;
        const _ivInteractionsGraph = reader.tgReadObject();
        args.ivInteractionsGraph = _ivInteractionsGraph;
        const _viewsBySourceGraph = reader.tgReadObject();
        args.viewsBySourceGraph = _viewsBySourceGraph;
        const _newFollowersBySourceGraph = reader.tgReadObject();
        args.newFollowersBySourceGraph = _newFollowersBySourceGraph;
        const _languagesGraph = reader.tgReadObject();
        args.languagesGraph = _languagesGraph;
        const _reactionsByEmotionGraph = reader.tgReadObject();
        args.reactionsByEmotionGraph = _reactionsByEmotionGraph;
        const _storyInteractionsGraph = reader.tgReadObject();
        args.storyInteractionsGraph = _storyInteractionsGraph;
        const _storyReactionsByEmotionGraph = reader.tgReadObject();
        args.storyReactionsByEmotionGraph = _storyReactionsByEmotionGraph;
        const _recentPostsInteractions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.recentPostsInteractions = _recentPostsInteractions;
        return new BroadcastStats(args);
    }
}