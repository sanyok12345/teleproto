import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypeInputReplyTo } from "../../types/TypeInputReplyTo";
import { TypeWebViewResult } from "../../types/TypeWebViewResult";

export class RequestWebView extends MTProtoRequest {
    static CONSTRUCTOR_ID = 647873217;
    static SUBCLASS_OF_ID = 2479793990;
    static className = "messages.RequestWebView";
    static classType = "request";

    flags?: number;
    fromBotMenu?: boolean;
    silent?: boolean;
    compact?: boolean;
    fullscreen?: boolean;
    peer?: EntityLike;
    bot?: EntityLike;
    url?: string;
    startParam?: string;
    themeParams?: TypeDataJSON;
    platform!: string;
    replyTo?: TypeInputReplyTo;
    sendAs?: EntityLike;

    constructor(args: { flags?: number, fromBotMenu?: boolean, silent?: boolean, compact?: boolean, fullscreen?: boolean, peer?: EntityLike, bot?: EntityLike, url?: string, startParam?: string, themeParams?: TypeDataJSON, platform?: string, replyTo?: TypeInputReplyTo, sendAs?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.fromBotMenu = args.fromBotMenu;
        this.silent = args.silent;
        this.compact = args.compact;
        this.fullscreen = args.fullscreen;
        this.peer = args.peer;
        this.bot = args.bot;
        this.url = args.url;
        this.startParam = args.startParam;
        this.themeParams = args.themeParams;
        this.platform = args.platform!;
        this.replyTo = args.replyTo;
        this.sendAs = args.sendAs;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(647873217, false);
        let flags = 0;
        if (this.fromBotMenu) { flags |= 1 << 4; }
        if (this.silent) { flags |= 1 << 5; }
        if (this.compact) { flags |= 1 << 7; }
        if (this.fullscreen) { flags |= 1 << 8; }
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 1; }
        if (this.startParam !== undefined && this.startParam !== null) { flags |= 1 << 3; }
        if (this.themeParams !== undefined && this.themeParams !== null) { flags |= 1 << 2; }
        if (this.replyTo !== undefined && this.replyTo !== null) { flags |= 1 << 0; }
        if (this.sendAs !== undefined && this.sendAs !== null) { flags |= 1 << 13; }
        writer.writeInt(flags, false);
        if (this.fromBotMenu !== undefined && this.fromBotMenu !== null) {
        }
        if (this.silent !== undefined && this.silent !== null) {
        }
        if (this.compact !== undefined && this.compact !== null) {
        }
        if (this.fullscreen !== undefined && this.fullscreen !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.write((this.bot! as any).getBytes());
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        if (this.startParam !== undefined && this.startParam !== null) {
            writer.tgWriteString(this.startParam);
        }
        if (this.themeParams !== undefined && this.themeParams !== null) {
            writer.write(this.themeParams.getBytes());
        }
        writer.tgWriteString(this.platform);
        if (this.replyTo !== undefined && this.replyTo !== null) {
            writer.write(this.replyTo.getBytes());
        }
        if (this.sendAs !== undefined && this.sendAs !== null) {
            writer.write((this.sendAs as any).getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWebViewResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RequestWebView {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 4)) {
            const _fromBotMenu = true;
            args.fromBotMenu = _fromBotMenu;
        } else {
            args.fromBotMenu = false;
        }
        if (args.flags & (1 << 5)) {
            const _silent = true;
            args.silent = _silent;
        } else {
            args.silent = false;
        }
        if (args.flags & (1 << 7)) {
            const _compact = true;
            args.compact = _compact;
        } else {
            args.compact = false;
        }
        if (args.flags & (1 << 8)) {
            const _fullscreen = true;
            args.fullscreen = _fullscreen;
        } else {
            args.fullscreen = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        if (args.flags & (1 << 1)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        if (args.flags & (1 << 3)) {
            const _startParam = reader.tgReadString();
            args.startParam = _startParam;
        } else {
            args.startParam = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _themeParams = reader.tgReadObject();
            args.themeParams = _themeParams;
        } else {
            args.themeParams = undefined;
        }
        const _platform = reader.tgReadString();
        args.platform = _platform;
        if (args.flags & (1 << 0)) {
            const _replyTo = reader.tgReadObject();
            args.replyTo = _replyTo;
        } else {
            args.replyTo = undefined;
        }
        if (args.flags & (1 << 13)) {
            const _sendAs = reader.tgReadObject();
            args.sendAs = _sendAs;
        } else {
            args.sendAs = undefined;
        }
        return new RequestWebView(args);
    }
}