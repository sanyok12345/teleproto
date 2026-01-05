import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeMessagesFilter } from "../../types/TypeMessagesFilter";
import { TypeMessages } from "../../types/messages/TypeMessages";

export class SearchSentMedia extends MTProtoRequest {
    static CONSTRUCTOR_ID = 276705696;
    static SUBCLASS_OF_ID = 3568569182;
    static className = "messages.SearchSentMedia";
    static classType = "request";

    q!: string;
    filter!: TypeMessagesFilter;
    limit!: number;

    constructor(args: { q?: string, filter?: TypeMessagesFilter, limit?: number } = {}) {
        super();
        this.q = args.q!;
        this.filter = args.filter!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(276705696, false);
        writer.tgWriteString(this.q);
        writer.write(this.filter.getBytes());
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeMessages {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SearchSentMedia {
        const args: any = {};
        const _q = reader.tgReadString();
        args.q = _q;
        const _filter = reader.tgReadObject();
        args.filter = _filter;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new SearchSentMedia(args);
    }
}