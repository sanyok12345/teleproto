import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeStatsDateRangeDays } from "../TypeStatsDateRangeDays";
import { TypeStatsAbsValueAndPrev } from "../TypeStatsAbsValueAndPrev";
import { TypeStatsGraph } from "../TypeStatsGraph";
import { TypeStatsGroupTopPoster } from "../TypeStatsGroupTopPoster";
import { TypeStatsGroupTopAdmin } from "../TypeStatsGroupTopAdmin";
import { TypeStatsGroupTopInviter } from "../TypeStatsGroupTopInviter";
import { TypeUser } from "../TypeUser";

export class MegagroupStats extends TLObject {
    static CONSTRUCTOR_ID = 4018141462;
    static SUBCLASS_OF_ID = 1532608141;
    static className = "stats.MegagroupStats";
    static classType = "constructor";

    period!: TypeStatsDateRangeDays;
    members!: TypeStatsAbsValueAndPrev;
    messages!: TypeStatsAbsValueAndPrev;
    viewers!: TypeStatsAbsValueAndPrev;
    posters!: TypeStatsAbsValueAndPrev;
    growthGraph!: TypeStatsGraph;
    membersGraph!: TypeStatsGraph;
    newMembersBySourceGraph!: TypeStatsGraph;
    languagesGraph!: TypeStatsGraph;
    messagesGraph!: TypeStatsGraph;
    actionsGraph!: TypeStatsGraph;
    topHoursGraph!: TypeStatsGraph;
    weekdaysGraph!: TypeStatsGraph;
    topPosters!: TypeStatsGroupTopPoster[];
    topAdmins!: TypeStatsGroupTopAdmin[];
    topInviters!: TypeStatsGroupTopInviter[];
    users!: TypeUser[];

    constructor(args: { period?: TypeStatsDateRangeDays, members?: TypeStatsAbsValueAndPrev, messages?: TypeStatsAbsValueAndPrev, viewers?: TypeStatsAbsValueAndPrev, posters?: TypeStatsAbsValueAndPrev, growthGraph?: TypeStatsGraph, membersGraph?: TypeStatsGraph, newMembersBySourceGraph?: TypeStatsGraph, languagesGraph?: TypeStatsGraph, messagesGraph?: TypeStatsGraph, actionsGraph?: TypeStatsGraph, topHoursGraph?: TypeStatsGraph, weekdaysGraph?: TypeStatsGraph, topPosters?: TypeStatsGroupTopPoster[], topAdmins?: TypeStatsGroupTopAdmin[], topInviters?: TypeStatsGroupTopInviter[], users?: TypeUser[] } = {}) {
        super();
        this.period = args.period!;
        this.members = args.members!;
        this.messages = args.messages!;
        this.viewers = args.viewers!;
        this.posters = args.posters!;
        this.growthGraph = args.growthGraph!;
        this.membersGraph = args.membersGraph!;
        this.newMembersBySourceGraph = args.newMembersBySourceGraph!;
        this.languagesGraph = args.languagesGraph!;
        this.messagesGraph = args.messagesGraph!;
        this.actionsGraph = args.actionsGraph!;
        this.topHoursGraph = args.topHoursGraph!;
        this.weekdaysGraph = args.weekdaysGraph!;
        this.topPosters = args.topPosters!;
        this.topAdmins = args.topAdmins!;
        this.topInviters = args.topInviters!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4018141462, false);
        writer.write(this.period.getBytes());
        writer.write(this.members.getBytes());
        writer.write(this.messages.getBytes());
        writer.write(this.viewers.getBytes());
        writer.write(this.posters.getBytes());
        writer.write(this.growthGraph.getBytes());
        writer.write(this.membersGraph.getBytes());
        writer.write(this.newMembersBySourceGraph.getBytes());
        writer.write(this.languagesGraph.getBytes());
        writer.write(this.messagesGraph.getBytes());
        writer.write(this.actionsGraph.getBytes());
        writer.write(this.topHoursGraph.getBytes());
        writer.write(this.weekdaysGraph.getBytes());
        writer.writeVector(this.topPosters, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.topAdmins, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.topInviters, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MegagroupStats {
        const args: any = {};
        const _period = reader.tgReadObject();
        args.period = _period;
        const _members = reader.tgReadObject();
        args.members = _members;
        const _messages = reader.tgReadObject();
        args.messages = _messages;
        const _viewers = reader.tgReadObject();
        args.viewers = _viewers;
        const _posters = reader.tgReadObject();
        args.posters = _posters;
        const _growthGraph = reader.tgReadObject();
        args.growthGraph = _growthGraph;
        const _membersGraph = reader.tgReadObject();
        args.membersGraph = _membersGraph;
        const _newMembersBySourceGraph = reader.tgReadObject();
        args.newMembersBySourceGraph = _newMembersBySourceGraph;
        const _languagesGraph = reader.tgReadObject();
        args.languagesGraph = _languagesGraph;
        const _messagesGraph = reader.tgReadObject();
        args.messagesGraph = _messagesGraph;
        const _actionsGraph = reader.tgReadObject();
        args.actionsGraph = _actionsGraph;
        const _topHoursGraph = reader.tgReadObject();
        args.topHoursGraph = _topHoursGraph;
        const _weekdaysGraph = reader.tgReadObject();
        args.weekdaysGraph = _weekdaysGraph;
        const _topPosters = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.topPosters = _topPosters;
        const _topAdmins = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.topAdmins = _topAdmins;
        const _topInviters = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.topInviters = _topInviters;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new MegagroupStats(args);
    }
}