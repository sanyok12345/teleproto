import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ReceivedQueue extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1436924774;
    static SUBCLASS_OF_ID = 2300109160;
    static className = "messages.ReceivedQueue";
    static classType = "request";

    maxQts!: number;

    constructor(args: { maxQts?: number } = {}) {
        super();
        this.maxQts = args.maxQts!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1436924774, false);
        writer.writeInt(this.maxQts);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): bigint[] {
        const result = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ReceivedQueue {
        const args: any = {};
        const _maxQts = reader.readInt();
        args.maxQts = _maxQts;
        return new ReceivedQueue(args);
    }
}