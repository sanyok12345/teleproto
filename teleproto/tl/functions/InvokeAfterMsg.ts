import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeAfterMsg extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3416209197;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeAfterMsg";
    static classType = "request";

    msgId?: bigint;
    query?: any;

    constructor(args: { msgId?: bigint, query?: any } = {}) {
        super();
        this.msgId = args.msgId;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3416209197, false);
        writer.writeLargeInt(this.msgId!, 64);
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

    static fromReader(reader: BinaryReader): InvokeAfterMsg {
        const args: any = {};
        const _msgId = reader.readLargeInt(64);
        args.msgId = _msgId;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeAfterMsg(args);
    }
}