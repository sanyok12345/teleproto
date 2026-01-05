import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeInlineBotSwitchPM } from "../TypeInlineBotSwitchPM";
import { TypeInlineBotWebView } from "../TypeInlineBotWebView";
import { TypeBotInlineResult } from "../TypeBotInlineResult";
import { TypeUser } from "../TypeUser";

export class BotResults extends TLObject {
    static CONSTRUCTOR_ID = 3760321270;
    static SUBCLASS_OF_ID = 1054136777;
    static className = "messages.BotResults";
    static classType = "constructor";

    flags!: number;
    gallery?: boolean;
    queryId!: bigint;
    nextOffset?: string;
    switchPm?: TypeInlineBotSwitchPM;
    switchWebview?: TypeInlineBotWebView;
    results!: TypeBotInlineResult[];
    cacheTime!: number;
    users!: TypeUser[];

    constructor(args: { flags?: number, gallery?: boolean, queryId?: bigint, nextOffset?: string, switchPm?: TypeInlineBotSwitchPM, switchWebview?: TypeInlineBotWebView, results?: TypeBotInlineResult[], cacheTime?: number, users?: TypeUser[] } = {}) {
        super();
        this.flags = args.flags!;
        this.gallery = args.gallery;
        this.queryId = args.queryId!;
        this.nextOffset = args.nextOffset;
        this.switchPm = args.switchPm;
        this.switchWebview = args.switchWebview;
        this.results = args.results!;
        this.cacheTime = args.cacheTime!;
        this.users = args.users!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3760321270, false);
        let flags = 0;
        if (this.gallery) { flags |= 1 << 0; }
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 1; }
        if (this.switchPm !== undefined && this.switchPm !== null) { flags |= 1 << 2; }
        if (this.switchWebview !== undefined && this.switchWebview !== null) { flags |= 1 << 3; }
        writer.writeInt(flags, false);
        if (this.gallery !== undefined && this.gallery !== null) {
        }
        writer.writeLargeInt(this.queryId, 64);
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        if (this.switchPm !== undefined && this.switchPm !== null) {
            writer.write(this.switchPm.getBytes());
        }
        if (this.switchWebview !== undefined && this.switchWebview !== null) {
            writer.write(this.switchWebview.getBytes());
        }
        writer.writeVector(this.results, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.cacheTime);
        writer.writeVector(this.users, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _gallery = true;
            args.gallery = _gallery;
        } else {
            args.gallery = false;
        }
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        if (args.flags & (1 << 1)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _switchPm = reader.tgReadObject();
            args.switchPm = _switchPm;
        } else {
            args.switchPm = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _switchWebview = reader.tgReadObject();
            args.switchWebview = _switchWebview;
        } else {
            args.switchWebview = undefined;
        }
        const _results = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.results = _results;
        const _cacheTime = reader.readInt();
        args.cacheTime = _cacheTime;
        const _users = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.users = _users;
        return new BotResults(args);
    }
}