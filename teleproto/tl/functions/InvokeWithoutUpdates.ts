import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeWithoutUpdates extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3214170551;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeWithoutUpdates";
    static classType = "request";

    query?: any;

    constructor(args: { query?: any } = {}) {
        super();
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3214170551, false);
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

    static fromReader(reader: BinaryReader): InvokeWithoutUpdates {
        const args: any = {};
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeWithoutUpdates(args);
    }
}