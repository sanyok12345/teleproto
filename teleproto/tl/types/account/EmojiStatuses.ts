import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeEmojiStatus } from "../TypeEmojiStatus";

export class EmojiStatuses extends TLObject {
    static CONSTRUCTOR_ID = 2428790737;
    static SUBCLASS_OF_ID = 3554674122;
    static className = "account.EmojiStatuses";
    static classType = "constructor";

    hash!: bigint;
    statuses!: TypeEmojiStatus[];

    constructor(args: { hash?: bigint, statuses?: TypeEmojiStatus[] } = {}) {
        super();
        this.hash = args.hash!;
        this.statuses = args.statuses!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2428790737, false);
        writer.writeLargeInt(this.hash, 64);
        writer.writeVector(this.statuses, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiStatuses {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        const _statuses = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.statuses = _statuses;
        return new EmojiStatuses(args);
    }
}