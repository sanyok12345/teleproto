import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeTopPeerCategory } from "./TypeTopPeerCategory";
import { TypeTopPeer } from "./TypeTopPeer";

export class TopPeerCategoryPeers extends TLObject {
    static CONSTRUCTOR_ID = 4219683473;
    static SUBCLASS_OF_ID = 78563632;
    static className = "TopPeerCategoryPeers";
    static classType = "constructor";

    category!: TypeTopPeerCategory;
    count!: number;
    peers!: TypeTopPeer[];

    constructor(args: { category?: TypeTopPeerCategory, count?: number, peers?: TypeTopPeer[] } = {}) {
        super();
        this.category = args.category!;
        this.count = args.count!;
        this.peers = args.peers!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4219683473, false);
        writer.write(this.category.getBytes());
        writer.writeInt(this.count);
        writer.writeVector(this.peers, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): TopPeerCategoryPeers {
        const args: any = {};
        const _category = reader.tgReadObject();
        args.category = _category;
        const _count = reader.readInt();
        args.count = _count;
        const _peers = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.peers = _peers;
        return new TopPeerCategoryPeers(args);
    }
}