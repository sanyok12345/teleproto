import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateBotStopped extends TLObject {
    static CONSTRUCTOR_ID = 3297184329;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateBotStopped";
    static classType = "constructor";

    userId!: bigint;
    date!: number;
    stopped!: boolean;
    qts!: number;

    constructor(args: { userId?: bigint, date?: number, stopped?: boolean, qts?: number } = {}) {
        super();
        this.userId = args.userId!;
        this.date = args.date!;
        this.stopped = args.stopped!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3297184329, false);
        writer.writeLargeInt(this.userId, 64);
        writer.writeInt(this.date);
        writer.tgWriteBool(this.stopped);
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateBotStopped {
        const args: any = {};
        const _userId = reader.readLargeInt(64);
        args.userId = _userId;
        const _date = reader.readInt();
        args.date = _date;
        const _stopped = reader.tgReadBool();
        args.stopped = _stopped;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateBotStopped(args);
    }
}