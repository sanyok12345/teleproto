import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateWebViewResultSent extends TLObject {
    static CONSTRUCTOR_ID = 361936797;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateWebViewResultSent";
    static classType = "constructor";

    queryId!: bigint;

    constructor(args: { queryId?: bigint } = {}) {
        super();
        this.queryId = args.queryId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(361936797, false);
        writer.writeLargeInt(this.queryId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateWebViewResultSent {
        const args: any = {};
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        return new UpdateWebViewResultSent(args);
    }
}