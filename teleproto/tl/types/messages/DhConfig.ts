import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class DhConfig extends TLObject {
    static CONSTRUCTOR_ID = 740433629;
    static SUBCLASS_OF_ID = 3834178955;
    static className = "messages.DhConfig";
    static classType = "constructor";

    g!: number;
    p!: Buffer;
    version!: number;
    random!: Buffer;

    constructor(args: { g?: number, p?: Buffer, version?: number, random?: Buffer } = {}) {
        super();
        this.g = args.g!;
        this.p = args.p!;
        this.version = args.version!;
        this.random = args.random!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(740433629, false);
        writer.writeInt(this.g);
        writer.tgWriteBytes(this.p);
        writer.writeInt(this.version);
        writer.tgWriteBytes(this.random);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DhConfig {
        const args: any = {};
        const _g = reader.readInt();
        args.g = _g;
        const _p = reader.tgReadBytes();
        args.p = _p;
        const _version = reader.readInt();
        args.version = _version;
        const _random = reader.tgReadBytes();
        args.random = _random;
        return new DhConfig(args);
    }
}