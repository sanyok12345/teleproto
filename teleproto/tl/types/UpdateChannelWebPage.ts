import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeWebPage } from "./TypeWebPage";

export class UpdateChannelWebPage extends TLObject {
    static CONSTRUCTOR_ID = 791390623;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdateChannelWebPage";
    static classType = "constructor";

    channelId!: bigint;
    webpage!: TypeWebPage;
    pts!: number;
    ptsCount!: number;

    constructor(args: { channelId?: bigint, webpage?: TypeWebPage, pts?: number, ptsCount?: number } = {}) {
        super();
        this.channelId = args.channelId!;
        this.webpage = args.webpage!;
        this.pts = args.pts!;
        this.ptsCount = args.ptsCount!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(791390623, false);
        writer.writeLargeInt(this.channelId, 64);
        writer.write(this.webpage.getBytes());
        writer.writeInt(this.pts);
        writer.writeInt(this.ptsCount);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdateChannelWebPage {
        const args: any = {};
        const _channelId = reader.readLargeInt(64);
        args.channelId = _channelId;
        const _webpage = reader.tgReadObject();
        args.webpage = _webpage;
        const _pts = reader.readInt();
        args.pts = _pts;
        const _ptsCount = reader.readInt();
        args.ptsCount = _ptsCount;
        return new UpdateChannelWebPage(args);
    }
}