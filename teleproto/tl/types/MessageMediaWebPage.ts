import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWebPage } from "./TypeWebPage";

export class MessageMediaWebPage extends TLObject {
    static CONSTRUCTOR_ID = 3723562043;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaWebPage";
    static classType = "constructor";

    flags!: number;
    forceLargeMedia?: boolean;
    forceSmallMedia?: boolean;
    manual?: boolean;
    safe?: boolean;
    webpage!: TypeWebPage;

    constructor(args: { flags?: number, forceLargeMedia?: boolean, forceSmallMedia?: boolean, manual?: boolean, safe?: boolean, webpage?: TypeWebPage } = {}) {
        super();
        this.flags = args.flags!;
        this.forceLargeMedia = args.forceLargeMedia;
        this.forceSmallMedia = args.forceSmallMedia;
        this.manual = args.manual;
        this.safe = args.safe;
        this.webpage = args.webpage!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3723562043, false);
        let flags = 0;
        if (this.forceLargeMedia) { flags |= 1 << 0; }
        if (this.forceSmallMedia) { flags |= 1 << 1; }
        if (this.manual) { flags |= 1 << 3; }
        if (this.safe) { flags |= 1 << 4; }
        writer.writeInt(flags, false);
        if (this.forceLargeMedia !== undefined && this.forceLargeMedia !== null) {
        }
        if (this.forceSmallMedia !== undefined && this.forceSmallMedia !== null) {
        }
        if (this.manual !== undefined && this.manual !== null) {
        }
        if (this.safe !== undefined && this.safe !== null) {
        }
        writer.write(this.webpage.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaWebPage {
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
        if (args.flags & (1 << 3)) {
            const _manual = true;
            args.manual = _manual;
        } else {
            args.manual = false;
        }
        if (args.flags & (1 << 4)) {
            const _safe = true;
            args.safe = _safe;
        } else {
            args.safe = false;
        }
        const _webpage = reader.tgReadObject();
        args.webpage = _webpage;
        return new MessageMediaWebPage(args);
    }
}