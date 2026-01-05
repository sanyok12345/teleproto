import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypeWebViewResult } from "../../types/TypeWebViewResult";

export class RequestMainWebView extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3386908283;
    static SUBCLASS_OF_ID = 2479793990;
    static className = "messages.RequestMainWebView";
    static classType = "request";

    flags?: number;
    compact?: boolean;
    fullscreen?: boolean;
    peer?: EntityLike;
    bot?: EntityLike;
    startParam?: string;
    themeParams?: TypeDataJSON;
    platform!: string;

    constructor(args: { flags?: number, compact?: boolean, fullscreen?: boolean, peer?: EntityLike, bot?: EntityLike, startParam?: string, themeParams?: TypeDataJSON, platform?: string } = {}) {
        super();
        this.flags = args.flags;
        this.compact = args.compact;
        this.fullscreen = args.fullscreen;
        this.peer = args.peer;
        this.bot = args.bot;
        this.startParam = args.startParam;
        this.themeParams = args.themeParams;
        this.platform = args.platform!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3386908283, false);
        let flags = 0;
        if (this.compact) { flags |= 1 << 7; }
        if (this.fullscreen) { flags |= 1 << 8; }
        if (this.startParam !== undefined && this.startParam !== null) { flags |= 1 << 1; }
        if (this.themeParams !== undefined && this.themeParams !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.compact !== undefined && this.compact !== null) {
        }
        if (this.fullscreen !== undefined && this.fullscreen !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.write((this.bot! as any).getBytes());
        if (this.startParam !== undefined && this.startParam !== null) {
            writer.tgWriteString(this.startParam);
        }
        if (this.themeParams !== undefined && this.themeParams !== null) {
            writer.write(this.themeParams.getBytes());
        }
        writer.tgWriteString(this.platform);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWebViewResult {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RequestMainWebView {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
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
            const _startParam = reader.tgReadString();
            args.startParam = _startParam;
        } else {
            args.startParam = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _themeParams = reader.tgReadObject();
            args.themeParams = _themeParams;
        } else {
            args.themeParams = undefined;
        }
        const _platform = reader.tgReadString();
        args.platform = _platform;
        return new RequestMainWebView(args);
    }
}