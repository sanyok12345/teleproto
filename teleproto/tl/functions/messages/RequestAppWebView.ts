import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInputBotApp } from "../../types/TypeInputBotApp";
import { TypeDataJSON } from "../../types/TypeDataJSON";
import { TypeWebViewResult } from "../../types/TypeWebViewResult";

export class RequestAppWebView extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1398901710;
    static SUBCLASS_OF_ID = 2479793990;
    static className = "messages.RequestAppWebView";
    static classType = "request";

    flags?: number;
    writeAllowed?: boolean;
    compact?: boolean;
    fullscreen?: boolean;
    peer?: EntityLike;
    app!: TypeInputBotApp;
    startParam?: string;
    themeParams?: TypeDataJSON;
    platform!: string;

    constructor(args: { flags?: number, writeAllowed?: boolean, compact?: boolean, fullscreen?: boolean, peer?: EntityLike, app?: TypeInputBotApp, startParam?: string, themeParams?: TypeDataJSON, platform?: string } = {}) {
        super();
        this.flags = args.flags;
        this.writeAllowed = args.writeAllowed;
        this.compact = args.compact;
        this.fullscreen = args.fullscreen;
        this.peer = args.peer;
        this.app = args.app!;
        this.startParam = args.startParam;
        this.themeParams = args.themeParams;
        this.platform = args.platform!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1398901710, false);
        let flags = 0;
        if (this.writeAllowed) { flags |= 1 << 0; }
        if (this.compact) { flags |= 1 << 7; }
        if (this.fullscreen) { flags |= 1 << 8; }
        if (this.startParam !== undefined && this.startParam !== null) { flags |= 1 << 1; }
        if (this.themeParams !== undefined && this.themeParams !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.writeAllowed !== undefined && this.writeAllowed !== null) {
        }
        if (this.compact !== undefined && this.compact !== null) {
        }
        if (this.fullscreen !== undefined && this.fullscreen !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.write(this.app.getBytes());
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

    static fromReader(reader: BinaryReader): RequestAppWebView {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _writeAllowed = true;
            args.writeAllowed = _writeAllowed;
        } else {
            args.writeAllowed = false;
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
        const _app = reader.tgReadObject();
        args.app = _app;
        if (args.flags & (1 << 1)) {
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
        return new RequestAppWebView(args);
    }
}