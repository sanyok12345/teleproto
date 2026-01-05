import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SavedDialogsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3223285736;
    static SUBCLASS_OF_ID = 1632352382;
    static className = "messages.SavedDialogsNotModified";
    static classType = "constructor";

    count!: number;

    constructor(args: { count?: number } = {}) {
        super();
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3223285736, false);
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SavedDialogsNotModified {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        return new SavedDialogsNotModified(args);
    }
}