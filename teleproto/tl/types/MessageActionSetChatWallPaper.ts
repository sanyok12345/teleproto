import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWallPaper } from "./TypeWallPaper";

export class MessageActionSetChatWallPaper extends TLObject {
    static CONSTRUCTOR_ID = 1348510708;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionSetChatWallPaper";
    static classType = "constructor";

    flags!: number;
    same?: boolean;
    forBoth?: boolean;
    wallpaper!: TypeWallPaper;

    constructor(args: { flags?: number, same?: boolean, forBoth?: boolean, wallpaper?: TypeWallPaper } = {}) {
        super();
        this.flags = args.flags!;
        this.same = args.same;
        this.forBoth = args.forBoth;
        this.wallpaper = args.wallpaper!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1348510708, false);
        let flags = 0;
        if (this.same) { flags |= 1 << 0; }
        if (this.forBoth) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.same !== undefined && this.same !== null) {
        }
        if (this.forBoth !== undefined && this.forBoth !== null) {
        }
        writer.write(this.wallpaper.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionSetChatWallPaper {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _same = true;
            args.same = _same;
        } else {
            args.same = false;
        }
        if (args.flags & (1 << 1)) {
            const _forBoth = true;
            args.forBoth = _forBoth;
        } else {
            args.forBoth = false;
        }
        const _wallpaper = reader.tgReadObject();
        args.wallpaper = _wallpaper;
        return new MessageActionSetChatWallPaper(args);
    }
}