import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePeer } from "./TypePeer";

export class UpdatePinnedForumTopics extends TLObject {
    static CONSTRUCTOR_ID = 3740353488;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePinnedForumTopics";
    static classType = "constructor";

    flags!: number;
    peer!: TypePeer;
    order?: number[];

    constructor(args: { flags?: number, peer?: TypePeer, order?: number[] } = {}) {
        super();
        this.flags = args.flags!;
        this.peer = args.peer!;
        this.order = args.order;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3740353488, false);
        let flags = 0;
        if (this.order !== undefined && this.order !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.peer.getBytes());
        if (this.order !== undefined && this.order !== null) {
            writer.writeVector(this.order, (item) => {
                writer.writeInt(item);
            });
        }
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePinnedForumTopics {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        if (args.flags & (1 << 0)) {
            const _order = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.order = _order;
        } else {
            args.order = undefined;
        }
        return new UpdatePinnedForumTopics(args);
    }
}