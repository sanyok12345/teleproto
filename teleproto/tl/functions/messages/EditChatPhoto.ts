import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputChatPhoto } from "../../types/TypeInputChatPhoto";
import { TypeUpdates } from "../../types/TypeUpdates";

export class EditChatPhoto extends MTProtoRequest {
    static CONSTRUCTOR_ID = 903730804;
    static SUBCLASS_OF_ID = 2331323052;
    static className = "messages.EditChatPhoto";
    static classType = "request";

    chatId!: bigint;
    photo!: TypeInputChatPhoto;

    constructor(args: { chatId?: bigint, photo?: TypeInputChatPhoto } = {}) {
        super();
        this.chatId = args.chatId!;
        this.photo = args.photo!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(903730804, false);
        writer.writeLargeInt(this.chatId, 64);
        writer.write(this.photo.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUpdates {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): EditChatPhoto {
        const args: any = {};
        const _chatId = reader.readLargeInt(64);
        args.chatId = _chatId;
        const _photo = reader.tgReadObject();
        args.photo = _photo;
        return new EditChatPhoto(args);
    }
}