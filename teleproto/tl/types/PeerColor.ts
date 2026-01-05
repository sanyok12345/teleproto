import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class PeerColor extends TLObject {
    static CONSTRUCTOR_ID = 3041614543;
    static SUBCLASS_OF_ID = 4068582527;
    static className = "PeerColor";
    static classType = "constructor";

    flags!: number;
    color?: number;
    backgroundEmojiId?: bigint;

    constructor(args: { flags?: number, color?: number, backgroundEmojiId?: bigint } = {}) {
        super();
        this.flags = args.flags!;
        this.color = args.color;
        this.backgroundEmojiId = args.backgroundEmojiId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3041614543, false);
        let flags = 0;
        if (this.color !== undefined && this.color !== null) { flags |= 1 << 0; }
        if (this.backgroundEmojiId !== undefined && this.backgroundEmojiId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.color !== undefined && this.color !== null) {
            writer.writeInt(this.color);
        }
        if (this.backgroundEmojiId !== undefined && this.backgroundEmojiId !== null) {
            writer.writeLargeInt(this.backgroundEmojiId, 64);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): PeerColor {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _color = reader.readInt();
            args.color = _color;
        } else {
            args.color = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _backgroundEmojiId = reader.readLargeInt(64);
            args.backgroundEmojiId = _backgroundEmojiId;
        } else {
            args.backgroundEmojiId = undefined;
        }
        return new PeerColor(args);
    }
}