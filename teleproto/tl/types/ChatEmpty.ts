import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatEmpty extends TLObject {
    static CONSTRUCTOR_ID = 693512293;
    static SUBCLASS_OF_ID = 3316604308;
    static className = "ChatEmpty";
    static classType = "constructor";

    id!: bigint;

    constructor(args: { id?: bigint } = {}) {
        super();
        this.id = args.id!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(693512293, false);
        writer.writeLargeInt(this.id, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatEmpty {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        return new ChatEmpty(args);
    }
}