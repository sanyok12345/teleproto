import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class WebViewResultUrl extends TLObject {
    static CONSTRUCTOR_ID = 1294139288;
    static SUBCLASS_OF_ID = 2479793990;
    static className = "WebViewResultUrl";
    static classType = "constructor";

    flags!: number;
    fullsize?: boolean;
    fullscreen?: boolean;
    queryId?: bigint;
    url!: string;

    constructor(args: { flags?: number, fullsize?: boolean, fullscreen?: boolean, queryId?: bigint, url?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.fullsize = args.fullsize;
        this.fullscreen = args.fullscreen;
        this.queryId = args.queryId;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1294139288, false);
        let flags = 0;
        if (this.fullsize) { flags |= 1 << 1; }
        if (this.fullscreen) { flags |= 1 << 2; }
        if (this.queryId !== undefined && this.queryId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.fullsize !== undefined && this.fullsize !== null) {
        }
        if (this.fullscreen !== undefined && this.fullscreen !== null) {
        }
        if (this.queryId !== undefined && this.queryId !== null) {
            writer.writeLargeInt(this.queryId, 64);
        }
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebViewResultUrl {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _fullsize = true;
            args.fullsize = _fullsize;
        } else {
            args.fullsize = false;
        }
        if (args.flags & (1 << 2)) {
            const _fullscreen = true;
            args.fullscreen = _fullscreen;
        } else {
            args.fullscreen = false;
        }
        if (args.flags & (1 << 0)) {
            const _queryId = reader.readLargeInt(64);
            args.queryId = _queryId;
        } else {
            args.queryId = undefined;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        return new WebViewResultUrl(args);
    }
}