import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputEmojiStatusCollectible extends TLObject {
    static CONSTRUCTOR_ID = 118758847;
    static SUBCLASS_OF_ID = 4180717880;
    static className = "InputEmojiStatusCollectible";
    static classType = "constructor";

    flags!: number;
    collectibleId!: bigint;
    until?: number;

    constructor(args: { flags?: number, collectibleId?: bigint, until?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.collectibleId = args.collectibleId!;
        this.until = args.until;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(118758847, false);
        let flags = 0;
        if (this.until !== undefined && this.until !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.collectibleId, 64);
        if (this.until !== undefined && this.until !== null) {
            writer.writeInt(this.until);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputEmojiStatusCollectible {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _collectibleId = reader.readLargeInt(64);
        args.collectibleId = _collectibleId;
        if (args.flags & (1 << 0)) {
            const _until = reader.readInt();
            args.until = _until;
        } else {
            args.until = undefined;
        }
        return new InputEmojiStatusCollectible(args);
    }
}