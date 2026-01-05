import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class RpcAnswerDropped extends TLObject {
    static CONSTRUCTOR_ID = 2755319991;
    static SUBCLASS_OF_ID = 1271559536;
    static className = "RpcAnswerDropped";
    static classType = "constructor";

    msgId!: bigint;
    seqNo!: number;
    bytes!: number;

    constructor(args: { msgId?: bigint, seqNo?: number, bytes?: number } = {}) {
        super();
        this.msgId = args.msgId!;
        this.seqNo = args.seqNo!;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2755319991, false);
        writer.writeLargeInt(this.msgId, 64);
        writer.writeInt(this.seqNo);
        writer.writeInt(this.bytes);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): RpcAnswerDropped {
        const args: any = {};
        const _msgId = reader.readLargeInt(64);
        args.msgId = _msgId;
        const _seqNo = reader.readInt();
        args.seqNo = _seqNo;
        const _bytes = reader.readInt();
        args.bytes = _bytes;
        return new RpcAnswerDropped(args);
    }
}