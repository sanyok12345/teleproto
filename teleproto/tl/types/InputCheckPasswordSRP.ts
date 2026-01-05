import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputCheckPasswordSRP extends TLObject {
    static CONSTRUCTOR_ID = 3531600002;
    static SUBCLASS_OF_ID = 3558536544;
    static className = "InputCheckPasswordSRP";
    static classType = "constructor";

    srpId!: bigint;
    A!: Buffer;
    M1!: Buffer;

    constructor(args: { srpId?: bigint, A?: Buffer, M1?: Buffer } = {}) {
        super();
        this.srpId = args.srpId!;
        this.A = args.A!;
        this.M1 = args.M1!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3531600002, false);
        writer.writeLargeInt(this.srpId, 64);
        writer.tgWriteBytes(this.A);
        writer.tgWriteBytes(this.M1);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputCheckPasswordSRP {
        const args: any = {};
        const _srpId = reader.readLargeInt(64);
        args.srpId = _srpId;
        const _A = reader.tgReadBytes();
        args.A = _A;
        const _M1 = reader.tgReadBytes();
        args.M1 = _M1;
        return new InputCheckPasswordSRP(args);
    }
}