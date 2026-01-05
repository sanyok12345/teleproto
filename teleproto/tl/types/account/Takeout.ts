import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class Takeout extends TLObject {
    static CONSTRUCTOR_ID = 1304052993;
    static SUBCLASS_OF_ID = 2218704517;
    static className = "account.Takeout";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1304052993, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Takeout {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new Takeout(args);
    }
}