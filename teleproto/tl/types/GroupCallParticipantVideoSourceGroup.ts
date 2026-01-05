import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class GroupCallParticipantVideoSourceGroup extends TLObject {
    static CONSTRUCTOR_ID = 3702593719;
    static SUBCLASS_OF_ID = 806746236;
    static className = "GroupCallParticipantVideoSourceGroup";
    static classType = "constructor";

    semantics!: string;
    sources!: number[];

    constructor(args: { semantics?: string, sources?: number[] } = {}) {
        super();
        this.semantics = args.semantics!;
        this.sources = args.sources!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3702593719, false);
        writer.tgWriteString(this.semantics);
        writer.writeVector(this.sources, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallParticipantVideoSourceGroup {
        const args: any = {};
        const _semantics = reader.tgReadString();
        args.semantics = _semantics;
        const _sources = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.sources = _sources;
        return new GroupCallParticipantVideoSourceGroup(args);
    }
}