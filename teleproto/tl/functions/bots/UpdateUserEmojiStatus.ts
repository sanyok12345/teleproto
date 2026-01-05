import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeEmojiStatus } from "../../types/TypeEmojiStatus";

export class UpdateUserEmojiStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3986632901;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.UpdateUserEmojiStatus";
    static classType = "request";

    userId!: EntityLike;
    emojiStatus!: TypeEmojiStatus;

    constructor(args: { userId?: EntityLike, emojiStatus?: TypeEmojiStatus } = {}) {
        super();
        this.userId = args.userId!;
        this.emojiStatus = args.emojiStatus!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3986632901, false);
        writer.write((this.userId as any).getBytes());
        writer.write(this.emojiStatus.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateUserEmojiStatus {
        const args: any = {};
        const _userId = reader.tgReadObject();
        args.userId = _userId;
        const _emojiStatus = reader.tgReadObject();
        args.emojiStatus = _emojiStatus;
        return new UpdateUserEmojiStatus(args);
    }
}