import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeDocumentAttribute } from "./TypeDocumentAttribute";

export class WebDocumentNoProxy extends TLObject {
    static CONSTRUCTOR_ID = 4190682310;
    static SUBCLASS_OF_ID = 996419604;
    static className = "WebDocumentNoProxy";
    static classType = "constructor";

    url!: string;
    size!: number;
    mimeType!: string;
    attributes!: TypeDocumentAttribute[];

    constructor(args: { url?: string, size?: number, mimeType?: string, attributes?: TypeDocumentAttribute[] } = {}) {
        super();
        this.url = args.url!;
        this.size = args.size!;
        this.mimeType = args.mimeType!;
        this.attributes = args.attributes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4190682310, false);
        writer.tgWriteString(this.url);
        writer.writeInt(this.size);
        writer.tgWriteString(this.mimeType);
        writer.writeVector(this.attributes, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): WebDocumentNoProxy {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _size = reader.readInt();
        args.size = _size;
        const _mimeType = reader.tgReadString();
        args.mimeType = _mimeType;
        const _attributes = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.attributes = _attributes;
        return new WebDocumentNoProxy(args);
    }
}