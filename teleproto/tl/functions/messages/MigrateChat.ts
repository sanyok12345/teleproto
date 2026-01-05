import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUpdates } from "../../types/TypeUpdates";

export class MigrateChat extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2726777625;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.MigrateChat";
    static classType = "request";

    chatId!: bigint;

    constructor(args: { chatId?: bigint } = {}) {
        super();
        this.chatId = args.chatId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2726777625, false);
        writer.writeLargeInt(this.chatId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): MigrateChat {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        return new MigrateChat(args);
    }
}