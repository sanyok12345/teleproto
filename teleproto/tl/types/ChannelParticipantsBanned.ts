import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipantsBanned extends TLObject {
    static CONSTRUCTOR_ID = 338142689;
    static SUBCLASS_OF_ID = 3209570131;
    static className = "ChannelParticipantsBanned";
    static classType = "constructor";

    q!: string;

    constructor(args: { q?: string } = {}) {
        super();
        this.q = args.q!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(338142689, false);
        writer.tgWriteString(this.q);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantsBanned {
        const args: any = {};
        const _q = reader.tgReadString();
        args.q = _q;
        return new ChannelParticipantsBanned(args);
    }
}