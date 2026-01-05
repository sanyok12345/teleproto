import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipantsKicked extends TLObject {
    static CONSTRUCTOR_ID = 2746567045;
    static SUBCLASS_OF_ID = 3209570131;
    static className = "ChannelParticipantsKicked";
    static classType = "constructor";

    q!: string;

    constructor(args: { q?: string } = {}) {
        super();
        this.q = args.q!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2746567045, false);
        writer.tgWriteString(this.q);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantsKicked {
        const args: any = {};
        const _q = reader.tgReadString();
        args.q = _q;
        return new ChannelParticipantsKicked(args);
    }
}