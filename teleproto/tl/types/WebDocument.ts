import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocumentAttribute } from "./TypeDocumentAttribute";

export class WebDocument extends TLObject {
    static CONSTRUCTOR_ID = 475467473;
    static SUBCLASS_OF_ID = 996419604;
    static className = "WebDocument";
    static classType = "constructor";

    url!: string;
    accessHash!: bigint;
    size!: number;
    mimeType!: string;
    attributes!: TypeDocumentAttribute[];

    constructor(args: { url?: string, accessHash?: bigint, size?: number, mimeType?: string, attributes?: TypeDocumentAttribute[] } = {}) {
        super();
        this.url = args.url!;
        this.accessHash = args.accessHash!;
        this.size = args.size!;
        this.mimeType = args.mimeType!;
        this.attributes = args.attributes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(475467473, false);
        writer.tgWriteString(this.url);
        writer.writeLargeInt(this.accessHash, 64);
        writer.writeInt(this.size);
        writer.tgWriteString(this.mimeType);
        writer.writeVector(this.attributes, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebDocument {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _accessHash = reader.readLargeInt(64);
        args.accessHash = _accessHash;
        const _size = reader.readInt();
        args.size = _size;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        const _attributes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.attributes = _attributes;
        return new WebDocument(args);
    }
}