import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class ReorderPinnedForumTopics extends MTProtoRequest {
    static CONSTRUCTOR_ID = 242762224;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.ReorderPinnedForumTopics";
    static classType = "request";

    flags?: number;
    force?: boolean;
    peer?: EntityLike;
    order!: number[];

    constructor(args: { flags?: number, force?: boolean, peer?: EntityLike, order?: number[] } = {}) {
        super();
        this.flags = args.flags;
        this.force = args.force;
        this.peer = args.peer;
        this.order = args.order!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(242762224, false);
        let flags = 0;
        if (this.force) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.force !== undefined && this.force !== null) {
        }
        writer.write((this.peer! as any).getBytes());
        writer.writeVector(this.order, (item) => {
            writer.writeInt(item);
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReorderPinnedForumTopics {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _force = true;
            args.force = _force;
        } else {
            args.force = false;
        }
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _order = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.order = _order;
        return new ReorderPinnedForumTopics(args);
    }
}