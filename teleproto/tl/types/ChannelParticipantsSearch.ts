import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChannelParticipantsSearch extends TLObject {
    static CONSTRUCTOR_ID = 106343499;
    static SUBCLASS_OF_ID = 3209570131;
    static className = "ChannelParticipantsSearch";
    static classType = "constructor";

    q!: string;

    constructor(args: { q?: string } = {}) {
        super();
        this.q = args.q!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(106343499, false);
        writer.tgWriteString(this.q);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChannelParticipantsSearch {
        const args: any = {};
        const _q = reader.tgReadString();
        args.q = _q;
        return new ChannelParticipantsSearch(args);
    }
}