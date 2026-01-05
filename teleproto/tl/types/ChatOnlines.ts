import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class ChatOnlines extends TLObject {
    static CONSTRUCTOR_ID = 4030849616;
    static SUBCLASS_OF_ID = 2357301306;
    static className = "ChatOnlines";
    static classType = "constructor";

    onlines!: number;

    constructor(args: { onlines?: number } = {}) {
        super();
        this.onlines = args.onlines!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4030849616, false);
        writer.writeInt(this.onlines);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): ChatOnlines {
        const args: any = {};
        const _onlines = reader.readInt();
        args.onlines = _onlines;
        return new ChatOnlines(args);
    }
}