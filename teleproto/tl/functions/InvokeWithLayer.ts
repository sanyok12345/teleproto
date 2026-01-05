import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeWithLayer extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3667594509;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeWithLayer";
    static classType = "request";

    layer!: number;
    query?: any;

    constructor(args: { layer?: number, query?: any } = {}) {
        super();
        this.layer = args.layer!;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3667594509, false);
        writer.writeInt(this.layer);
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

    static fromReader(reader: BinaryReader): InvokeWithLayer {
        const args: any = {};
        const _layer = reader.readInt();
        args.layer = _layer;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeWithLayer(args);
    }
}