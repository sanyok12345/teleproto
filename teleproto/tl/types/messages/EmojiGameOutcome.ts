import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class EmojiGameOutcome extends TLObject {
    static CONSTRUCTOR_ID = 3660240455;
    static SUBCLASS_OF_ID = 251090281;
    static className = "messages.EmojiGameOutcome";
    static classType = "constructor";

    seed!: Buffer;
    stakeTonAmount!: bigint;
    tonAmount!: bigint;

    constructor(args: { seed?: Buffer, stakeTonAmount?: bigint, tonAmount?: bigint } = {}) {
        super();
        this.seed = args.seed!;
        this.stakeTonAmount = args.stakeTonAmount!;
        this.tonAmount = args.tonAmount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3660240455, false);
        writer.tgWriteBytes(this.seed);
        writer.writeLargeInt(this.stakeTonAmount, 64);
        writer.writeLargeInt(this.tonAmount, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiGameOutcome {
        const args: any = {};
        const _seed = reader.tgReadBytes();
        args.seed = _seed;
        const _stakeTonAmount = reader.readLargeInt(64);
        args.stakeTonAmount = _stakeTonAmount;
        const _tonAmount = reader.readLargeInt(64);
        args.tonAmount = _tonAmount;
        return new EmojiGameOutcome(args);
    }
}