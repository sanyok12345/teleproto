import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChats } from "../../types/messages/TypeChats";

export class GetLeftChannels extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2202135744;
    static SUBCLASS_OF_ID = 2580925204;
    static className = "channels.GetLeftChannels";
    static classType = "request";

    offset!: number;

    constructor(args: { offset?: number } = {}) {
        super();
        this.offset = args.offset!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2202135744, false);
        writer.writeInt(this.offset);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChats {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetLeftChannels {
        const args: any = {};
        const _offset = reader.readInt();
        args.offset = _offset;
        return new GetLeftChannels(args);
    }
}