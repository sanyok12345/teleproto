import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class EmojiGameDiceInfo extends TLObject {
    static CONSTRUCTOR_ID = 1155883043;
    static SUBCLASS_OF_ID = 105590818;
    static className = "messages.EmojiGameDiceInfo";
    static classType = "constructor";

    flags!: number;
    gameHash!: string;
    prevStake!: bigint;
    currentStreak!: number;
    params!: number[];
    playsLeft?: number;

    constructor(args: { flags?: number, gameHash?: string, prevStake?: bigint, currentStreak?: number, params?: number[], playsLeft?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.gameHash = args.gameHash!;
        this.prevStake = args.prevStake!;
        this.currentStreak = args.currentStreak!;
        this.params = args.params!;
        this.playsLeft = args.playsLeft;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1155883043, false);
        let flags = 0;
        if (this.playsLeft !== undefined && this.playsLeft !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.gameHash);
        writer.writeLargeInt(this.prevStake, 64);
        writer.writeInt(this.currentStreak);
        writer.writeVector(this.params, (item) => {
            writer.writeInt(item);
        });
        if (this.playsLeft !== undefined && this.playsLeft !== null) {
            writer.writeInt(this.playsLeft);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): EmojiGameDiceInfo {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _gameHash = reader.tgReadString();
        args.gameHash = _gameHash;
        const _prevStake = reader.readLargeInt(64);
        args.prevStake = _prevStake;
        const _currentStreak = reader.readInt();
        args.currentStreak = _currentStreak;
        const _params = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.params = _params;
        if (args.flags & (1 << 0)) {
            const _playsLeft = reader.readInt();
            args.playsLeft = _playsLeft;
        } else {
            args.playsLeft = undefined;
        }
        return new EmojiGameDiceInfo(args);
    }
}