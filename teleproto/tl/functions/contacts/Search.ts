import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFound } from "../../types/contacts/TypeFound";

export class Search extends MTProtoRequest {
    static CONSTRUCTOR_ID = 301470424;
    static SUBCLASS_OF_ID = 1132896995;
    static className = "contacts.Search";
    static classType = "request";

    q!: string;
    limit!: number;

    constructor(args: { q?: string, limit?: number } = {}) {
        super();
        this.q = args.q!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(301470424, false);
        writer.tgWriteString(this.q);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFound {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): Search {
        const args: any = {};
        const _q = reader.tgReadString();
        args.q = _q;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new Search(args);
    }
}