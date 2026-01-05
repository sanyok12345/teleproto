import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class DhConfigNotModified extends TLObject {
    static CONSTRUCTOR_ID = 3236054581;
    static SUBCLASS_OF_ID = 3834178955;
    static className = "messages.DhConfigNotModified";
    static classType = "constructor";

    random!: Buffer;

    constructor(args: { random?: Buffer } = {}) {
        super();
        this.random = args.random!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3236054581, false);
        writer.tgWriteBytes(this.random);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DhConfigNotModified {
        const args: any = {};
        const _random = reader.tgReadBytes();
        args.random = _random;
        return new DhConfigNotModified(args);
    }
}