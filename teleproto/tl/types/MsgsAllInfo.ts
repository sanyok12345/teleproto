import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class MsgsAllInfo extends TLObject {
    static CONSTRUCTOR_ID = 2361446705;
    static SUBCLASS_OF_ID = 4203727700;
    static className = "MsgsAllInfo";
    static classType = "constructor";

    msgIds!: bigint[];
    info!: string;

    constructor(args: { msgIds?: bigint[], info?: string } = {}) {
        super();
        this.msgIds = args.msgIds!;
        this.info = args.info!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2361446705, false);
        writer.writeVector(this.msgIds, (item) => {
            writer.writeLargeInt(item, 64);
        });
        writer.tgWriteString(this.info);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): MsgsAllInfo {
        const args: any = {};
        const _msgIds = reader.readVector((reader) => {
            const item = reader.readLargeInt(64);
            return item;
        });
        args.msgIds = _msgIds;
        const _info = reader.tgReadString();
        args.info = _info;
        return new MsgsAllInfo(args);
    }
}