import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MessageActionGameScore extends TLObject {
    static CONSTRUCTOR_ID = 2460428406;
    static SUBCLASS_OF_ID = 2256589094;
    static className = "MessageActionGameScore";
    static classType = "constructor";

    gameId!: bigint;
    score!: number;

    constructor(args: { gameId?: bigint, score?: number } = {}) {
        super();
        this.gameId = args.gameId!;
        this.score = args.score!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2460428406, false);
        writer.writeLargeInt(this.gameId, 64);
        writer.writeInt(this.score);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageActionGameScore {
        const args: any = {};
        const _gameId = reader.readLargeInt(64);
        args.gameId = _gameId;
        const _score = reader.readInt();
        args.score = _score;
        return new MessageActionGameScore(args);
    }
}