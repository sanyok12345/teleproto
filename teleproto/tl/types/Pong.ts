import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class Pong extends TLObject {
    static CONSTRUCTOR_ID = 880243653;
    static SUBCLASS_OF_ID = 2171268721;
    static className = "Pong";
    static classType = "constructor";

    msgId!: bigint;
    pingId!: bigint;

    constructor(args: { msgId?: bigint, pingId?: bigint } = {}) {
        super();
        this.msgId = args.msgId!;
        this.pingId = args.pingId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(880243653, false);
        writer.writeLargeInt(this.msgId, 64);
        writer.writeLargeInt(this.pingId, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): Pong {
        const args: any = {};
        const _msgId = reader.readLargeInt(64);
        args.msgId = _msgId;
        const _pingId = reader.readLargeInt(64);
        args.pingId = _pingId;
        return new Pong(args);
    }
}