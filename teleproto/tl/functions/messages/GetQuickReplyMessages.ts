import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class GetQuickReplyMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2493814211;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.GetQuickReplyMessages";
    static classType = "request";

    flags?: number;
    shortcutId!: number;
    id?: number[];
    hash?: bigint;

    constructor(args: { flags?: number, shortcutId?: number, id?: number[], hash?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.shortcutId = args.shortcutId!;
        this.id = args.id;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2493814211, false);
        let flags = 0;
        if (this.id !== undefined && this.id !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.writeInt(this.shortcutId);
        if (this.id !== undefined && this.id !== null) {
            writer.writeVector(this.id, (item) => {
                writer.writeInt(item);
            });
        }
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetQuickReplyMessages {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        if (args.flags & (1 << 0)) {
            const _id = reader.readVector((reader) => {
                const item = reader.readInt();
                return item;
            });
            args.id = _id;
        } else {
            args.id = undefined;
        }
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetQuickReplyMessages(args);
    }
}