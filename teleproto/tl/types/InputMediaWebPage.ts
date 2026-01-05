import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMediaWebPage extends TLObject {
    static CONSTRUCTOR_ID = 3256584265;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaWebPage";
    static classType = "constructor";

    flags!: number;
    forceLargeMedia?: boolean;
    forceSmallMedia?: boolean;
    optional?: boolean;
    url!: string;

    constructor(args: { flags?: number, forceLargeMedia?: boolean, forceSmallMedia?: boolean, optional?: boolean, url?: string } = {}) {
        super();
        this.flags = args.flags!;
        this.forceLargeMedia = args.forceLargeMedia;
        this.forceSmallMedia = args.forceSmallMedia;
        this.optional = args.optional;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3256584265, false);
        let flags = 0;
        if (this.forceLargeMedia) { flags |= 1 << 0; }
        if (this.forceSmallMedia) { flags |= 1 << 1; }
        if (this.optional) { flags |= 1 << 2; }
        writer.writeInt(flags, false);
        if (this.forceLargeMedia !== undefined && this.forceLargeMedia !== null) {
        }
        if (this.forceSmallMedia !== undefined && this.forceSmallMedia !== null) {
        }
        if (this.optional !== undefined && this.optional !== null) {
        }
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaWebPage {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _forceLargeMedia = true;
            args.forceLargeMedia = _forceLargeMedia;
        } else {
            args.forceLargeMedia = false;
        }
        if (args.flags & (1 << 1)) {
            const _forceSmallMedia = true;
            args.forceSmallMedia = _forceSmallMedia;
        } else {
            args.forceSmallMedia = false;
        }
        if (args.flags & (1 << 2)) {
            const _optional = true;
            args.optional = _optional;
        } else {
            args.optional = false;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        return new InputMediaWebPage(args);
    }
}