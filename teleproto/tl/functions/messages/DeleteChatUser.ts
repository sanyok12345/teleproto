import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeUpdates } from "../../types/TypeUpdates";

export class DeleteChatUser extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2719505579;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.DeleteChatUser";
    static classType = "request";

    flags?: number;
    revokeHistory?: boolean;
    chatId!: bigint;
    userId!: EntityLike;

    constructor(args: { flags?: number, revokeHistory?: boolean, chatId?: bigint, userId?: EntityLike } = {}) {
        super();
        this.flags = args.flags;
        this.revokeHistory = args.revokeHistory;
        this.chatId = args.chatId!;
        this.userId = args.userId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2719505579, false);
        let flags = 0;
        if (this.revokeHistory) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.revokeHistory !== undefined && this.revokeHistory !== null) {
        }
        writer.writeLargeInt(this.chatId, 64);
        writer.write((this.userId as any).getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteChatUser {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _revokeHistory = true;
            args.revokeHistory = _revokeHistory;
        } else {
            args.revokeHistory = false;
        }
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        return new DeleteChatUser(args);
    }
}