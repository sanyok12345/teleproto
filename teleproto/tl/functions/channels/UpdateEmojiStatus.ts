import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeEmojiStatus } from "../../types/TypeEmojiStatus";
import { TypeUpdates } from "../../types/TypeUpdates";

export class UpdateEmojiStatus extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4040418984;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "channels.UpdateEmojiStatus";
    static classType = "request";

    channel?: EntityLike;
    emojiStatus!: TypeEmojiStatus;

    constructor(args: { channel?: EntityLike, emojiStatus?: TypeEmojiStatus } = {}) {
        super();
        this.channel = args.channel;
        this.emojiStatus = args.emojiStatus!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4040418984, false);
        writer.write((this.channel! as any).getBytes());
        writer.write(this.emojiStatus.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateEmojiStatus {
        const args: any = {};
        const _channel = reader.tgReadObject();
        args.channel = _channel;
        const _emojiStatus = reader.tgReadObject();
        args.emojiStatus = _emojiStatus;
        return new UpdateEmojiStatus(args);
    }
}