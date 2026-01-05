import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class DialogsNotModified extends TLObject {
    static CONSTRUCTOR_ID = 4041467286;
    static SUBCLASS_OF_ID = 236671726;
    static className = "messages.DialogsNotModified";
    static classType = "constructor";

    count!: number;

    constructor(args: { count?: number } = {}) {
        super();
        this.count = args.count!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4041467286, false);
        writer.writeInt(this.count);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DialogsNotModified {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        return new DialogsNotModified(args);
    }
}