import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class SentCodeTypeApp extends TLObject {
    static CONSTRUCTOR_ID = 1035688326;
    static SUBCLASS_OF_ID = 4284159374;
    static className = "auth.SentCodeTypeApp";
    static classType = "constructor";

    length!: number;

    constructor(args: { length?: number } = {}) {
        super();
        this.length = args.length!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1035688326, false);
        writer.writeInt(this.length);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SentCodeTypeApp {
        const args: any = {};
        const _length = reader.readInt();
        args.length = _length;
        return new SentCodeTypeApp(args);
    }
}