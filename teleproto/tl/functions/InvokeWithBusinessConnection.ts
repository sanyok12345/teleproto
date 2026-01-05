import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeWithBusinessConnection extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3710427022;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeWithBusinessConnection";
    static classType = "request";

    connectionId!: string;
    query?: any;

    constructor(args: { connectionId?: string, query?: any } = {}) {
        super();
        this.connectionId = args.connectionId!;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3710427022, false);
        writer.tgWriteString(this.connectionId);
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

    static fromReader(reader: BinaryReader): InvokeWithBusinessConnection {
        const args: any = {};
        const _connectionId = reader.tgReadString();
        args.connectionId = _connectionId;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeWithBusinessConnection(args);
    }
}