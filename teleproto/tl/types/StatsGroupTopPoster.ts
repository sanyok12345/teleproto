import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class StatsGroupTopPoster extends TLObject {
    static CONSTRUCTOR_ID = 2634330011;
    static SUBCLASS_OF_ID = 2177224227;
    static className = "StatsGroupTopPoster";
    static classType = "constructor";

    userId!: bigint;
    messages!: number;
    avgChars!: number;

    constructor(args: { userId?: bigint, messages?: number, avgChars?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.messages = args.messages!;
        this.avgChars = args.avgChars!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2634330011, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.messages);
        writer.writeInt(this.avgChars);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): StatsGroupTopPoster {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _messages = reader.readInt();
        args.messages = _messages;
        const _avgChars = reader.readInt();
        args.avgChars = _avgChars;
        return new StatsGroupTopPoster(args);
    }
}