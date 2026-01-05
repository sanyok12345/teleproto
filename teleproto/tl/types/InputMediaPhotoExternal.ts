import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMediaPhotoExternal extends TLObject {
    static CONSTRUCTOR_ID = 3854302746;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaPhotoExternal";
    static classType = "constructor";

    flags!: number;
    spoiler?: boolean;
    url!: string;
    ttlSeconds?: number;

    constructor(args: { flags?: number, spoiler?: boolean, url?: string, ttlSeconds?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.spoiler = args.spoiler;
        this.url = args.url!;
        this.ttlSeconds = args.ttlSeconds;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3854302746, false);
        let flags = 0;
        if (this.spoiler) { flags |= 1 << 1; }
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.spoiler !== undefined && this.spoiler !== null) {
        }
        writer.tgWriteString(this.url);
        if (this.ttlSeconds !== undefined && this.ttlSeconds !== null) {
            writer.writeInt(this.ttlSeconds);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaPhotoExternal {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _spoiler = true;
            args.spoiler = _spoiler;
        } else {
            args.spoiler = false;
        }
        const _url = reader.tgReadString();
        args.url = _url;
        if (args.flags & (1 << 0)) {
            const _ttlSeconds = reader.readInt();
            args.ttlSeconds = _ttlSeconds;
        } else {
            args.ttlSeconds = undefined;
        }
        return new InputMediaPhotoExternal(args);
    }
}