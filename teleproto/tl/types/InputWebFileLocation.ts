import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class InputWebFileLocation extends TLObject {
    static CONSTRUCTOR_ID = 3258570374;
    static SUBCLASS_OF_ID = 4147042521;
    static className = "InputWebFileLocation";
    static classType = "constructor";

    url!: string;
    accessHash!: bigint;

    constructor(args: { url?: string, accessHash?: bigint } = {}) {
        super();
        this.url = args.url!;
        this.accessHash = args.accessHash!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3258570374, false);
        writer.tgWriteString(this.url);
        writer.writeLargeInt(this.accessHash, 64);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputWebFileLocation {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        return new InputWebFileLocation(args);
    }
}