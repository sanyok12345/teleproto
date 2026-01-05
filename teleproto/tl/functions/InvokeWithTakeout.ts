import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeWithTakeout extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2896821550;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeWithTakeout";
    static classType = "request";

    takeoutId!: bigint;
    query?: any;

    constructor(args: { takeoutId?: bigint, query?: any } = {}) {
        super();
        this.takeoutId = args.takeoutId!;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2896821550, false);
        writer.writeLargeInt(this.takeoutId, 64);
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

    static fromReader(reader: BinaryReader): InvokeWithTakeout {
        const args: any = {};
        const _takeoutId = reader.readLargeInt(64);
        args.takeoutId = _takeoutId;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeWithTakeout(args);
    }
}