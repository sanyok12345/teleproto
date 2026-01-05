import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdateMessagePollVote extends TLObject {
    static CONSTRUCTOR_ID = 619974263;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateMessagePollVote";
    static classType = "constructor";

    pollId!: bigint;
    peer!: TypePeer;
    options!: Buffer[];
    qts!: number;

    constructor(args: { pollId?: bigint, peer?: TypePeer, options?: Buffer[], qts?: number } = {}) {
        super();
        this.pollId = args.pollId!;
        this.peer = args.peer!;
        this.options = args.options!;
        this.qts = args.qts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(619974263, false);
        writer.writeLargeInt(this.pollId, 64);
        writer.write(this.peer.getBytes());
        writer.writeVector(this.options, (item) => {
            writer.tgWriteBytes(item);
        });
        writer.writeInt(this.qts);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateMessagePollVote {
        const args: any = {};
        const _pollId = reader.readLargeInt(64);
        args.pollId = _pollId;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _options = reader.readVector((reader) => {
            const item = reader.tgReadBytes();
            return item;
        });
        args.options = _options;
        const _qts = reader.readInt();
        args.qts = _qts;
        return new UpdateMessagePollVote(args);
    }
}