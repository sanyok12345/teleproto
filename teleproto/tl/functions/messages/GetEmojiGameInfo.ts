import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmojiGameInfo } from "../../types/messages/TypeEmojiGameInfo";

export class GetEmojiGameInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4219374759;
    static SUBCLASS_OF_ID = 105590818;
    static className = "messages.GetEmojiGameInfo";
    static classType = "request";


    constructor(args: {  } = {}) {
        super();
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4219374759, false);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmojiGameInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetEmojiGameInfo {
        const args: any = {};
        return new GetEmojiGameInfo(args);
    }
}