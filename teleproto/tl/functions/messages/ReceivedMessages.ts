import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeReceivedNotifyMessage } from "../../types/TypeReceivedNotifyMessage";

export class ReceivedMessages extends MTProtoRequest {
    static CONSTRUCTOR_ID = 94983360;
    static SUBCLASS_OF_ID = 2238052503;
    static className = "messages.ReceivedMessages";
    static classType = "request";

    maxId?: number;

    constructor(args: { maxId?: number } = {}) {
        super();
        this.maxId = args.maxId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(94983360, false);
        writer.writeInt(this.maxId!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeReceivedNotifyMessage[] {
        const result = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReceivedMessages {
        const args: any = {};
        const _maxId = reader.readInt();
        args.maxId = _maxId;
        return new ReceivedMessages(args);
    }
}