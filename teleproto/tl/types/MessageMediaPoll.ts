import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePoll } from "./TypePoll";
import { TypePollResults } from "./TypePollResults";

export class MessageMediaPoll extends TLObject {
    static CONSTRUCTOR_ID = 1272375192;
    static SUBCLASS_OF_ID = 1198308914;
    static className = "MessageMediaPoll";
    static classType = "constructor";

    poll!: TypePoll;
    results!: TypePollResults;

    constructor(args: { poll?: TypePoll, results?: TypePollResults } = {}) {
        super();
        this.poll = args.poll!;
        this.results = args.results!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1272375192, false);
        writer.write(this.poll.getBytes());
        writer.write(this.results.getBytes());
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessageMediaPoll {
        const args: any = {};
        const _poll = reader.tgReadObject();
        args.poll = _poll;
        const _results = reader.tgReadObject();
        args.results = _results;
        return new MessageMediaPoll(args);
    }
}