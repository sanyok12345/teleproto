import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeEmojiStatus } from "./TypeEmojiStatus";

export class UpdateUserEmojiStatus extends TLObject {
    static CONSTRUCTOR_ID = 674706841;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateUserEmojiStatus";
    static classType = "constructor";

    userId!: bigint;
    emojiStatus!: TypeEmojiStatus;

    constructor(args: { userId?: bigint, emojiStatus?: TypeEmojiStatus } = {}) {
        super();
        this.userId = args.userId!;
        this.emojiStatus = args.emojiStatus!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(674706841, false);
        writer.writeLargeInt(this.userId, 64);
        writer.write(this.emojiStatus.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateUserEmojiStatus {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _emojiStatus = reader.tgReadObject();
        args.emojiStatus = _emojiStatus;
        return new UpdateUserEmojiStatus(args);
    }
}