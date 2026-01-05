import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MsgsStateInfo extends TLObject {
    static CONSTRUCTOR_ID = 81704317;
    static SUBCLASS_OF_ID = 118098532;
    static className = "MsgsStateInfo";
    static classType = "constructor";

    reqMsgId!: bigint;
    info!: string;

    constructor(args: { reqMsgId?: bigint, info?: string } = {}) {
        super();
        this.reqMsgId = args.reqMsgId!;
        this.info = args.info!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(81704317, false);
        writer.writeLargeInt(this.reqMsgId, 64);
        writer.tgWriteString(this.info);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MsgsStateInfo {
        const args: any = {};
        const _reqMsgId = reader.readLargeInt(64);
        args.reqMsgId = _reqMsgId;
        const _info = reader.tgReadString();
        args.info = _info;
        return new MsgsStateInfo(args);
    }
}