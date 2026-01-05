import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class EditChatAdmin extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2824589762;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.EditChatAdmin";
    static classType = "request";

    chatId!: bigint;
    userId!: EntityLike;
    isAdmin!: boolean;

    constructor(args: { chatId?: bigint, userId?: EntityLike, isAdmin?: boolean } = {}) {
        super();
        this.chatId = args.chatId!;
        this.userId = args.userId!;
        this.isAdmin = args.isAdmin!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2824589762, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.write((this.userId as any).getBytes());
        writer.tgWriteBool(this.isAdmin);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditChatAdmin {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _isAdmin = reader.tgReadBool();
        args.isAdmin = _isAdmin;
        return new EditChatAdmin(args);
    }
}