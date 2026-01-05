import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiStatus } from "../../types/TypeEmojiStatus";

export class UpdateEmojiStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4224966251;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdateEmojiStatus";
    static classType = "request";

    emojiStatus!: TypeEmojiStatus;

    constructor(args: { emojiStatus?: TypeEmojiStatus } = {}) {
        super();
        this.emojiStatus = args.emojiStatus!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4224966251, false);
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

    static fromReader(reader: BinaryReader): UpdateEmojiStatus {
        const args: any = {};
        const _emojiStatus = reader.tgReadObject();
        args.emojiStatus = _emojiStatus;
        return new UpdateEmojiStatus(args);
    }
}