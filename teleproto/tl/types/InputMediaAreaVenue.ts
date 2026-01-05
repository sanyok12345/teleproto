import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypeMediaAreaCoordinates } from "./TypeMediaAreaCoordinates";

export class InputMediaAreaVenue extends TLObject {
    static CONSTRUCTOR_ID = 2994872703;
    static SUBCLASS_OF_ID = 4084038642;
    static className = "InputMediaAreaVenue";
    static classType = "constructor";

    coordinates!: TypeMediaAreaCoordinates;
    queryId!: bigint;
    resultId!: string;

    constructor(args: { coordinates?: TypeMediaAreaCoordinates, queryId?: bigint, resultId?: string } = {}) {
        super();
        this.coordinates = args.coordinates!;
        this.queryId = args.queryId!;
        this.resultId = args.resultId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2994872703, false);
        writer.write(this.coordinates.getBytes());
        writer.writeLargeInt(this.queryId, 64);
        writer.tgWriteString(this.resultId);
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): InputMediaAreaVenue {
        const args: any = {};
        const _coordinates = reader.tgReadObject();
        args.coordinates = _coordinates;
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        const _resultId = reader.tgReadString();
        args.resultId = _resultId;
        return new InputMediaAreaVenue(args);
    }
}