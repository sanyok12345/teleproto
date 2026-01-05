import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DestroySessionNone extends TLObject {
    static CONSTRUCTOR_ID = 1658015945;
    static SUBCLASS_OF_ID = 2936858557;
    static className = "DestroySessionNone";
    static classType = "constructor";

    sessionId!: bigint;

    constructor(args: { sessionId?: bigint } = {}) {
        super();
        this.sessionId = args.sessionId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1658015945, false);
        writer.writeLargeInt(this.sessionId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DestroySessionNone {
        const args: any = {};
        const _sessionId = reader.readLargeInt(64);
        args.sessionId = _sessionId;
        return new DestroySessionNone(args);
    }
}