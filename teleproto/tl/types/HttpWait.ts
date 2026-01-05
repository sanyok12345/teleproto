import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class HttpWait extends TLObject {
    static CONSTRUCTOR_ID = 2459514271;
    static SUBCLASS_OF_ID = 310685398;
    static className = "HttpWait";
    static classType = "constructor";

    maxDelay!: number;
    waitAfter!: number;
    maxWait!: number;

    constructor(args: { maxDelay?: number, waitAfter?: number, maxWait?: number } = {}) {
        super();
        this.maxDelay = args.maxDelay!;
        this.waitAfter = args.waitAfter!;
        this.maxWait = args.maxWait!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2459514271, false);
        writer.writeInt(this.maxDelay);
        writer.writeInt(this.waitAfter);
        writer.writeInt(this.maxWait);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): HttpWait {
        const args: any = {};
        const _maxDelay = reader.readInt();
        args.maxDelay = _maxDelay;
        const _waitAfter = reader.readInt();
        args.waitAfter = _waitAfter;
        const _maxWait = reader.readInt();
        args.maxWait = _maxWait;
        return new HttpWait(args);
    }
}