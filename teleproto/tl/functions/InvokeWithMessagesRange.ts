import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeMessageRange } from "../types/TypeMessageRange";

export class InvokeWithMessagesRange extends MTProtoRequest {
    static CONSTRUCTOR_ID = 911373810;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeWithMessagesRange";
    static classType = "request";

    range!: TypeMessageRange;
    query?: any;

    constructor(args: { range?: TypeMessageRange, query?: any } = {}) {
        super();
        this.range = args.range!;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(911373810, false);
        writer.write(this.range.getBytes());
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

    static fromReader(reader: BinaryReader): InvokeWithMessagesRange {
        const args: any = {};
        const _range = reader.tgReadObject();
        args.range = _range;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeWithMessagesRange(args);
    }
}