import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class HighScore extends TLObject {
    static CONSTRUCTOR_ID = 1940093419;
    static SUBCLASS_OF_ID = 3542818357;
    static className = "HighScore";
    static classType = "constructor";

    pos!: number;
    userId!: bigint;
    score!: number;

    constructor(args: { pos?: number, userId?: bigint, score?: number } = {}) {
        super();
        this.pos = args.pos!;
        this.userId = args.userId!;
        this.score = args.score!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1940093419, false);
        writer.writeInt(this.pos);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.score);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): HighScore {
        const args: any = {};
        const _pos = reader.readInt();
        args.pos = _pos;
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _score = reader.readInt();
        args.score = _score;
        return new HighScore(args);
    }
}