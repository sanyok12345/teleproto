import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MsgsStateReq extends TLObject {
    static CONSTRUCTOR_ID = 3664378706;
    static SUBCLASS_OF_ID = 418389456;
    static className = "MsgsStateReq";
    static classType = "constructor";

    msgIds!: bigint[];

    constructor(args: { msgIds?: bigint[] } = {}) {
        super();
        this.msgIds = args.msgIds!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3664378706, false);
        writer.writeVector(this.msgIds, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MsgsStateReq {
        const args: any = {};
        const _msgIds = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.msgIds = _msgIds;
        return new MsgsStateReq(args);
    }
}