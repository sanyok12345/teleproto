import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeAfterMsgs extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1036301552;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeAfterMsgs";
    static classType = "request";

    msgIds!: bigint[];
    query?: any;

    constructor(args: { msgIds?: bigint[], query?: any } = {}) {
        super();
        this.msgIds = args.msgIds!;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1036301552, false);
        writer.writeVector(this.msgIds, (item) => {
            writer.writeLargeInt(item, 64);
        });
        writer.write(this.query!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): any {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InvokeAfterMsgs {
        const args: any = {};
        const _msgIds = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.msgIds = _msgIds;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeAfterMsgs(args);
    }
}