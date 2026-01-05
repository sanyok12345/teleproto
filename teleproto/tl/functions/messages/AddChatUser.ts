import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeInvitedUsers } from "../../types/messages/TypeInvitedUsers";

export class AddChatUser extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3418804487;
    static SUBCLASS_OF_ID = 1035899041;
    static className = "messages.AddChatUser";
    static classType = "request";

    chatId!: bigint;
    userId!: EntityLike;
    fwdLimit!: number;

    constructor(args: { chatId?: bigint, userId?: EntityLike, fwdLimit?: number } = {}) {
        super();
        this.chatId = args.chatId!;
        this.userId = args.userId!;
        this.fwdLimit = args.fwdLimit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3418804487, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.write((this.userId as any).getBytes());
        writer.writeInt(this.fwdLimit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeInvitedUsers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AddChatUser {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _fwdLimit = reader.readInt();
        args.fwdLimit = _fwdLimit;
        return new AddChatUser(args);
    }
}