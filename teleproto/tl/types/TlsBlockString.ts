import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class TlsBlockString extends TLObject {
    static CONSTRUCTOR_ID = 1488907607;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockString";
    static classType = "constructor";

    data!: string;

    constructor(args: { data?: string } = {}) {
        super();
        this.data = args.data!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1488907607, false);
        writer.tgWriteString(this.data);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockString {
        const args: any = {};
        const _data = reader.tgReadString();
        args.data = _data;
        return new TlsBlockString(args);
    }
}