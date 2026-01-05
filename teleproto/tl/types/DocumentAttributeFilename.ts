import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";

export class DocumentAttributeFilename extends TLObject {
    static CONSTRUCTOR_ID = 358154344;
    static SUBCLASS_OF_ID = 4146719643;
    static className = "DocumentAttributeFilename";
    static classType = "constructor";

    fileName!: string;

    constructor(args: { fileName?: string } = {}) {
        super();
        this.fileName = args.fileName!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(358154344, false);
        writer.tgWriteString(this.fileName);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): DocumentAttributeFilename {
        const args: any = {};
        const _fileName = reader.tgReadString();
        args.fileName = _fileName;
        return new DocumentAttributeFilename(args);
    }
}