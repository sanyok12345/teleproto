import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MsgResendReq extends TLObject {
    static CONSTRUCTOR_ID = 2105940488;
    static SUBCLASS_OF_ID = 33703188;
    static className = "MsgResendReq";
    static classType = "constructor";

    msgIds!: bigint[];

    constructor(args: { msgIds?: bigint[] } = {}) {
        super();
        this.msgIds = args.msgIds!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2105940488, false);
        writer.writeVector(this.msgIds, (item) => {
            writer.writeLargeInt(item, 64);
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MsgResendReq {
        const args: any = {};
        const _msgIds = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.msgIds = _msgIds;
        return new MsgResendReq(args);
    }
}