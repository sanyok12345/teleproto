import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputBotInlineResult } from "../../types/TypeInputBotInlineResult";
import { TypeInlineBotSwitchPM } from "../../types/TypeInlineBotSwitchPM";
import { TypeInlineBotWebView } from "../../types/TypeInlineBotWebView";

export class SetInlineBotResults extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3138561049;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetInlineBotResults";
    static classType = "request";

    flags?: number;
    gallery?: boolean;
    private?: boolean;
    queryId?: bigint;
    results!: TypeInputBotInlineResult[];
    cacheTime?: number;
    nextOffset?: string;
    switchPm?: TypeInlineBotSwitchPM;
    switchWebview?: TypeInlineBotWebView;

    constructor(args: { flags?: number, gallery?: boolean, private?: boolean, queryId?: bigint, results?: TypeInputBotInlineResult[], cacheTime?: number, nextOffset?: string, switchPm?: TypeInlineBotSwitchPM, switchWebview?: TypeInlineBotWebView } = {}) {
        super();
        this.flags = args.flags;
        this.gallery = args.gallery;
        this.private = args.private;
        this.queryId = args.queryId;
        this.results = args.results!;
        this.cacheTime = args.cacheTime;
        this.nextOffset = args.nextOffset;
        this.switchPm = args.switchPm;
        this.switchWebview = args.switchWebview;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3138561049, false);
        let flags = 0;
        if (this.gallery) { flags |= 1 << 0; }
        if (this.private) { flags |= 1 << 1; }
        if (this.nextOffset !== undefined && this.nextOffset !== null) { flags |= 1 << 2; }
        if (this.switchPm !== undefined && this.switchPm !== null) { flags |= 1 << 3; }
        if (this.switchWebview !== undefined && this.switchWebview !== null) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.gallery !== undefined && this.gallery !== null) {
        }
        if (this.private !== undefined && this.private !== null) {
        }
        writer.writeLargeInt(this.queryId!, 64);
        writer.writeVector(this.results, (item) => {
            writer.write(item.getBytes());
        });
        writer.writeInt(this.cacheTime!);
        if (this.nextOffset !== undefined && this.nextOffset !== null) {
            writer.tgWriteString(this.nextOffset);
        }
        if (this.switchPm !== undefined && this.switchPm !== null) {
            writer.write(this.switchPm.getBytes());
        }
        if (this.switchWebview !== undefined && this.switchWebview !== null) {
            writer.write(this.switchWebview.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetInlineBotResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _gallery = true;
            args.gallery = _gallery;
        } else {
            args.gallery = false;
        }
        if (args.flags & (1 << 1)) {
            const _private = true;
            args.private = _private;
        } else {
            args.private = false;
        }
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _results = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.results = _results;
        const _cacheTime = reader.readInt();
        args.cacheTime = _cacheTime;
        if (args.flags & (1 << 2)) {
            const _nextOffset = reader.tgReadString();
            args.nextOffset = _nextOffset;
        } else {
            args.nextOffset = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _switchPm = reader.tgReadObject();
            args.switchPm = _switchPm;
        } else {
            args.switchPm = undefined;
        }
        if (args.flags & (1 << 4)) {
            const _switchWebview = reader.tgReadObject();
            args.switchWebview = _switchWebview;
        } else {
            args.switchWebview = undefined;
        }
        return new SetInlineBotResults(args);
    }
}