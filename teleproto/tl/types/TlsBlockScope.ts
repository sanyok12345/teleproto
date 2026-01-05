import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTlsBlock } from "./TypeTlsBlock";

export class TlsBlockScope extends TLObject {
    static CONSTRUCTOR_ID = 3638474097;
    static SUBCLASS_OF_ID = 4044764304;
    static className = "TlsBlockScope";
    static classType = "constructor";

    entries!: TypeTlsBlock[];

    constructor(args: { entries?: TypeTlsBlock[] } = {}) {
        super();
        this.entries = args.entries!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3638474097, false);
        writer.writeVector(this.entries, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsBlockScope {
        const args: any = {};
        const _entries = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.entries = _entries;
        return new TlsBlockScope(args);
    }
}