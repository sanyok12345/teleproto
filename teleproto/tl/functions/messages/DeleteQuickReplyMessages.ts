import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeleteQuickReplyMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3775260944;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.DeleteQuickReplyMessages";
    static classType = "request";

    shortcutId!: number;
    id?: number[];

    constructor(args: { shortcutId?: number, id?: number[] } = {}) {
        super();
        this.shortcutId = args.shortcutId!;
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3775260944, false);
        writer.writeInt(this.shortcutId);
        writer.writeVector(this.id!, (item) => {
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

    static fromReader(reader: BinaryReader): DeleteQuickReplyMessages {
        const args: any = {};
        const _shortcutId = reader.readInt();
        args.shortcutId = _shortcutId;
        const _id = reader.readVector((reader) => {
            const item = reader.readInt();
            return item;
        });
        args.id = _id;
        return new DeleteQuickReplyMessages(args);
    }
}