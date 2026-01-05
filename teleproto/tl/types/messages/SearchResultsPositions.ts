import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { TLObject } from "../../../extensions/TLObject";
import { TypeSearchResultsPosition } from "../TypeSearchResultsPosition";

export class SearchResultsPositions extends TLObject {
    static CONSTRUCTOR_ID = 1404185519;
    static SUBCLASS_OF_ID = 3647172749;
    static className = "messages.SearchResultsPositions";
    static classType = "constructor";

    count!: number;
    positions!: TypeSearchResultsPosition[];

    constructor(args: { count?: number, positions?: TypeSearchResultsPosition[] } = {}) {
        super();
        this.count = args.count!;
        this.positions = args.positions!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1404185519, false);
        writer.writeInt(this.count);
        writer.writeVector(this.positions, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): SearchResultsPositions {
        const args: any = {};
        const _count = reader.readInt();
        args.count = _count;
        const _positions = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.positions = _positions;
        return new SearchResultsPositions(args);
    }
}