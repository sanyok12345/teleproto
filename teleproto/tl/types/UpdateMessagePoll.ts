import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePoll } from "./TypePoll";
import { TypePollResults } from "./TypePollResults";

export class UpdateMessagePoll extends TLObject {
    static CONSTRUCTOR_ID = 2896258427;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateMessagePoll";
    static classType = "constructor";

    flags!: number;
    pollId!: bigint;
    poll?: TypePoll;
    results!: TypePollResults;

    constructor(args: { flags?: number, pollId?: bigint, poll?: TypePoll, results?: TypePollResults } = {}) {
        super();
        this.flags = args.flags!;
        this.pollId = args.pollId!;
        this.poll = args.poll;
        this.results = args.results!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2896258427, false);
        let flags = 0;
        if (this.poll !== undefined && this.poll !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeLargeInt(this.pollId, 64);
        if (this.poll !== undefined && this.poll !== null) {
            writer.write(this.poll.getBytes());
        }
        writer.write(this.results.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateMessagePoll {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _pollId = reader.readLargeInt(64);
        args.pollId = _pollId;
        if (args.flags & (1 << 0)) {
            const _poll = reader.tgReadObject();
            args.poll = _poll;
        } else {
            args.poll = undefined;
        }
        const _results = reader.tgReadObject();
        args.results = _results;
        return new UpdateMessagePoll(args);
    }
}