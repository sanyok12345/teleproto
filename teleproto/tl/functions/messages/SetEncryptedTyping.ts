import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputEncryptedChat } from "../../types/TypeInputEncryptedChat";

export class SetEncryptedTyping extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2031374829;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetEncryptedTyping";
    static classType = "request";

    peer?: TypeInputEncryptedChat;
    typing!: boolean;

    constructor(args: { peer?: TypeInputEncryptedChat, typing?: boolean } = {}) {
        super();
        this.peer = args.peer;
        this.typing = args.typing!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2031374829, false);
        writer.write(this.peer!.getBytes());
        writer.tgWriteBool(this.typing);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetEncryptedTyping {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _typing = reader.tgReadBool();
        args.typing = _typing;
        return new SetEncryptedTyping(args);
    }
}