import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSearchResultsCalendarPeriod } from "../TypeSearchResultsCalendarPeriod";
import { TypeMessage } from "../TypeMessage";
import { TypeChat } from "../TypeChat";
import { TypeUser } from "../TypeUser";

export class SearchResultsCalendar extends TLObject {
    static CONSTRUCTOR_ID = 343859772;
    static SUBCLASS_OF_ID = 2462409743;
    static className = "messages.SearchResultsCalendar";
    static classType = "constructor";

    flags!: number;
    inexact?: boolean;
    count!: number;
    minDate!: number;
    minMsgId!: number;
    offsetIdOffset?: number;
    periods!: TypeSearchResultsCalendarPeriod[];
    messages!: TypeMessage[];
    chats!: TypeChat[];
    users!: TypeUser[];

    constructor(args: { flags?: number, inexact?: boolean, count?: number, minDate?: number, minMsgId?: number, offsetIdOffset?: number, periods?: TypeSearchResultsCalendarPeriod[], messages?: TypeMessage[], chats?: TypeChat[], users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.inexact = args.inexact;
        this.count = args.count!;
        this.minDate = args.minDate!;
        this.minMsgId = args.minMsgId!;
        this.offsetIdOffset = args.offsetIdOffset;
        this.periods = args.periods!;
        this.messages = args.messages!;
        this.chats = args.chats!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(343859772, false);
        let flags = 0;
        if (this.inexact) { flags |= 1 << 0; }
        if (this.offsetIdOffset !== undefined && this.offsetIdOffset !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.inexact !== undefined && this.inexact !== null) {
        }
        writer.writeInt(this.count);
        writer.writeInt(this.minDate);
        writer.writeInt(this.minMsgId);
        if (this.offsetIdOffset !== undefined && this.offsetIdOffset !== null) {
            writer.writeInt(this.offsetIdOffset);
        }
        writer.writeVector(this.periods, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.messages, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.chats, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SearchResultsCalendar {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _inexact = true;
            args.inexact = _inexact;
        } else {
            args.inexact = false;
        }
        const _count = reader.readInt();
        args.count = _count;
        const _minDate = reader.readInt();
        args.minDate = _minDate;
        const _minMsgId = reader.readInt();
        args.minMsgId = _minMsgId;
        if (args.flags & (1 << 1)) {
            const _offsetIdOffset = reader.readInt();
            args.offsetIdOffset = _offsetIdOffset;
        } else {
            args.offsetIdOffset = undefined;
        }
        const _periods = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.periods = _periods;
        const _messages = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.messages = _messages;
        const _chats = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.chats = _chats;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new SearchResultsCalendar(args);
    }
}