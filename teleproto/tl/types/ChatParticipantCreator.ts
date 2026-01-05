import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatParticipantCreator extends TLObject {
    static CONSTRUCTOR_ID = 3832270564;
    static SUBCLASS_OF_ID = 2105307014;
    static className = "ChatParticipantCreator";
    static classType = "constructor";

    userId!: bigint;

    constructor(args: { userId?: bigint } = {}) {
        super();
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3832270564, false);
        writer.writeLargeInt(this.userId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatParticipantCreator {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        return new ChatParticipantCreator(args);
    }
}