import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputMessageCallbackQuery extends TLObject {
    static CONSTRUCTOR_ID = 2902071934;
    static SUBCLASS_OF_ID = 1421262021;
    static className = "InputMessageCallbackQuery";
    static classType = "constructor";

    id!: number;
    queryId!: bigint;

    constructor(args: { id?: number, queryId?: bigint } = {}) {
        super();
        this.id = args.id!;
        this.queryId = args.queryId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2902071934, false);
        writer.writeInt(this.id);
        writer.writeLargeInt(this.queryId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMessageCallbackQuery {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        return new InputMessageCallbackQuery(args);
    }
}