import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";

export class CdnFileReuploadNeeded extends TLObject {
    static CONSTRUCTOR_ID = 4004045934;
    static SUBCLASS_OF_ID = 4123851048;
    static className = "upload.CdnFileReuploadNeeded";
    static classType = "constructor";

    requestToken!: Buffer;

    constructor(args: { requestToken?: Buffer } = {}) {
        super();
        this.requestToken = args.requestToken!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4004045934, false);
        writer.tgWriteBytes(this.requestToken);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): CdnFileReuploadNeeded {
        const args: any = {};
        const _requestToken = reader.tgReadBytes();
        args.requestToken = _requestToken;
        return new CdnFileReuploadNeeded(args);
    }
}