import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePopularAppBots } from "../../types/bots/TypePopularAppBots";

export class GetPopularAppBots extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3260088722;
    static SUBCLASS_OF_ID = 2070199933;
    static className = "bots.GetPopularAppBots";
    static classType = "request";

    offset!: string;
    limit!: number;

    constructor(args: { offset?: string, limit?: number } = {}) {
        super();
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3260088722, false);
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePopularAppBots {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPopularAppBots {
        const args: any = {};
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetPopularAppBots(args);
    }
}