import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class MessagesNotModified extends TLObject {
    static CONSTRUCTOR_ID = 1951620897;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.MessagesNotModified";
    static classType = "constructor";

    count!: number;

    constructor(args: { count?: number } = {}) {
        super();
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1951620897, false);
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MessagesNotModified {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        return new MessagesNotModified(args);
    }
}