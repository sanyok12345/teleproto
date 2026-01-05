import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class UpdateStoryID extends TLObject {
    static CONSTRUCTOR_ID = 468923833;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateStoryID";
    static classType = "constructor";

    id!: number;
    randomId!: bigint;

    constructor(args: { id?: number, randomId?: bigint } = {}) {
        super();
        this.id = args.id!;
        this.randomId = args.randomId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(468923833, false);
        writer.writeInt(this.id);
        writer.writeLargeInt(this.randomId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateStoryID {
        const args: any = {};
        const _id = reader.readInt();
        args.id = _id;
        const _randomId = reader.readLargeInt(64);
        args.randomId = _randomId;
        return new UpdateStoryID(args);
    }
}