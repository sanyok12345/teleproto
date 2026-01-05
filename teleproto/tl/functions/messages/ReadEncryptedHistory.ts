import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputEncryptedChat } from "../../types/TypeInputEncryptedChat";

export class ReadEncryptedHistory extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2135648522;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.ReadEncryptedHistory";
    static classType = "request";

    peer?: TypeInputEncryptedChat;
    maxDate!: number;

    constructor(args: { peer?: TypeInputEncryptedChat, maxDate?: number } = {}) {
        super();
        this.peer = args.peer;
        this.maxDate = args.maxDate!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2135648522, false);
        writer.write(this.peer!.getBytes());
        writer.writeInt(this.maxDate);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReadEncryptedHistory {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _maxDate = reader.readInt();
        args.maxDate = _maxDate;
        return new ReadEncryptedHistory(args);
    }
}