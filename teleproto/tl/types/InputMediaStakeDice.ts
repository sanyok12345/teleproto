import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMediaStakeDice extends TLObject {
    static CONSTRUCTOR_ID = 4087948362;
    static SUBCLASS_OF_ID = 4210575092;
    static className = "InputMediaStakeDice";
    static classType = "constructor";

    gameHash!: string;
    tonAmount!: bigint;
    clientSeed!: Buffer;

    constructor(args: { gameHash?: string, tonAmount?: bigint, clientSeed?: Buffer } = {}) {
        super();
        this.gameHash = args.gameHash!;
        this.tonAmount = args.tonAmount!;
        this.clientSeed = args.clientSeed!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4087948362, false);
        writer.tgWriteString(this.gameHash);
        writer.writeLargeInt(this.tonAmount, 64);
        writer.tgWriteBytes(this.clientSeed);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaStakeDice {
        const args: any = {};
        const _gameHash = reader.tgReadString();
        args.gameHash = _gameHash;
        const _tonAmount = reader.readLargeInt(64);
        args.tonAmount = _tonAmount;
        const _clientSeed = reader.tgReadBytes();
        args.clientSeed = _clientSeed;
        return new InputMediaStakeDice(args);
    }
}