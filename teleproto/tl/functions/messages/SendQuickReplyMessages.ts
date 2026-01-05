import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class SendQuickReplyMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1819610593;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.SendQuickReplyMessages";
    static classType = "request";

    peer?: EntityLike;
    shortcutId!: number;
    id?: number[];
    randomId!: bigint[];

    constructor(args: { peer?: EntityLike, shortcutId?: number, id?: number[], randomId?: bigint[] } = {}) {
        super();
        this.peer = args.peer;
        this.shortcutId = args.shortcutId!;
        this.id = args.id;
        this.randomId = args.randomId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1819610593, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeInt(this.shortcutId);
        writer.writeVector(this.id!, (item) => {
            writer.writeInt(item);
        });
        writer.writeVector(this.randomId, (item) => {
            writer.writeLargeInt(item, 64);
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

    static fromReader(reader: BinaryReader): SendQuickReplyMessages {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        const _randomId = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.randomId = _randomId;
        return new SendQuickReplyMessages(args);
    }
}