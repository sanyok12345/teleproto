import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipantsMentions extends TLObject {
    static CONSTRUCTOR_ID = 3763035371;
    static SUBCLASS_OF_ID = 3209570131;
    static className = "ChannelParticipantsMentions";
    static classType = "constructor";

    flags!: number;
    q?: string;
    topMsgId?: number;

    constructor(args: { flags?: number, q?: string, topMsgId?: number } = {}) {
        super();
        this.flags = args.flags!;
        this.q = args.q;
        this.topMsgId = args.topMsgId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3763035371, false);
        let flags = 0;
        if (this.q !== undefined && this.q !== null) { flags |= 1 << 0; }
        if (this.topMsgId !== undefined && this.topMsgId !== null) { flags |= 1 << 1; }
        writer.writeInt(flags, false);
        if (this.q !== undefined && this.q !== null) {
            writer.tgWriteString(this.q);
        }
        if (this.topMsgId !== undefined && this.topMsgId !== null) {
            writer.writeInt(this.topMsgId);
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantsMentions {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _q = reader.tgReadString();
            args.q = _q;
        } else {
            args.q = undefined;
        }
        if (args.flags & (1 << 1)) {
            const _topMsgId = reader.readInt();
            args.topMsgId = _topMsgId;
        } else {
            args.topMsgId = undefined;
        }
        return new ChannelParticipantsMentions(args);
    }
}