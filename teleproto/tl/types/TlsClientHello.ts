import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTlsBlock } from "./TypeTlsBlock";

export class TlsClientHello extends TLObject {
    static CONSTRUCTOR_ID = 262524817;
    static SUBCLASS_OF_ID = 3203533088;
    static className = "TlsClientHello";
    static classType = "constructor";

    blocks!: TypeTlsBlock[];

    constructor(args: { blocks?: TypeTlsBlock[] } = {}) {
        super();
        this.blocks = args.blocks!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(262524817, false);
        writer.writeVector(this.blocks, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TlsClientHello {
        const args: any = {};
        const _blocks = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.blocks = _blocks;
        return new TlsClientHello(args);
    }
}