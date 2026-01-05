import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";
import { TypeFutureSalts } from "../types/TypeFutureSalts";

export class GetFutureSalts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3105996036;
    static SUBCLASS_OF_ID = 277935383;
    static className = "GetFutureSalts";
    static classType = "request";

    num!: number;

    constructor(args: { num?: number } = {}) {
        super();
        this.num = args.num!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3105996036, false);
        writer.writeInt(this.num);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFutureSalts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFutureSalts {
        const args: any = {};
        const _num = reader.readInt();
        args.num = _num;
        return new GetFutureSalts(args);
    }
}