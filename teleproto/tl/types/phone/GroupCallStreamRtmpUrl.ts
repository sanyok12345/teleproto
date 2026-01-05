import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class GroupCallStreamRtmpUrl extends TLObject {
    static CONSTRUCTOR_ID = 767505458;
    static SUBCLASS_OF_ID = 3522500043;
    static className = "phone.GroupCallStreamRtmpUrl";
    static classType = "constructor";

    url!: string;
    key!: string;

    constructor(args: { url?: string, key?: string } = {}) {
        super();
        this.url = args.url!;
        this.key = args.key!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(767505458, false);
        writer.tgWriteString(this.url);
        writer.tgWriteString(this.key);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): GroupCallStreamRtmpUrl {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _key = reader.tgReadString();
        args.key = _key;
        return new GroupCallStreamRtmpUrl(args);
    }
}