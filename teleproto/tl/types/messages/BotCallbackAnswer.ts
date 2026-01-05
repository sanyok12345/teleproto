import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class BotCallbackAnswer extends TLObject {
    static CONSTRUCTOR_ID = 911761060;
    static SUBCLASS_OF_ID = 1817039244;
    static className = "messages.BotCallbackAnswer";
    static classType = "constructor";

    flags!: number;
    alert?: boolean;
    hasUrl?: boolean;
    nativeUi?: boolean;
    message?: string;
    url?: string;
    cacheTime!: number;

    constructor(args: { flags?: number, alert?: boolean, hasUrl?: boolean, nativeUi?: boolean, message?: string, url?: string, cacheTime?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.alert = args.alert;
        this.hasUrl = args.hasUrl;
        this.nativeUi = args.nativeUi;
        this.message = args.message;
        this.url = args.url;
        this.cacheTime = args.cacheTime!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(911761060, false);
        let flags = 0;
        if (this.alert) { flags |= 1 << 1; }
        if (this.hasUrl) { flags |= 1 << 3; }
        if (this.nativeUi) { flags |= 1 << 4; }
        if (this.message !== undefined && this.message !== null) { flags |= 1 << 0; }
        if (this.url !== undefined && this.url !== null) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.alert !== undefined && this.alert !== null) {
        }
        if (this.hasUrl !== undefined && this.hasUrl !== null) {
        }
        if (this.nativeUi !== undefined && this.nativeUi !== null) {
        }
        if (this.message !== undefined && this.message !== null) {
            writer.tgWriteString(this.message);
        }
        if (this.url !== undefined && this.url !== null) {
            writer.tgWriteString(this.url);
        }
        writer.writeInt(this.cacheTime);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): BotCallbackAnswer {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _alert = true;
            args.alert = _alert;
        } else {
            args.alert = false;
        }
        if (args.flags & (1 << 3)) {
            const _hasUrl = true;
            args.hasUrl = _hasUrl;
        } else {
            args.hasUrl = false;
        }
        if (args.flags & (1 << 4)) {
            const _nativeUi = true;
            args.nativeUi = _nativeUi;
        } else {
            args.nativeUi = false;
        }
        if (args.flags & (1 << 0)) {
            const _message = reader.tgReadString();
            args.message = _message;
        } else {
            args.message = undefined;
        }
        if (args.flags & (1 << 2)) {
            const _url = reader.tgReadString();
            args.url = _url;
        } else {
            args.url = undefined;
        }
        const _cacheTime = reader.readInt();
        args.cacheTime = _cacheTime;
        return new BotCallbackAnswer(args);
    }
}