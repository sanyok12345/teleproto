import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MsgsAck extends TLObject {
    static CONSTRUCTOR_ID = 1658238041;
    static SUBCLASS_OF_ID = 2188801988;
    static className = "MsgsAck";
    static classType = "constructor";

    msgIds!: bigint[];

    constructor(args: { msgIds?: bigint[] } = {}) {
        super();
        this.msgIds = args.msgIds!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1658238041, false);
        writer.writeVector(this.msgIds, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MsgsAck {
        const args: any = {};
        const _msgIds = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.msgIds = _msgIds;
        return new MsgsAck(args);
    }
}