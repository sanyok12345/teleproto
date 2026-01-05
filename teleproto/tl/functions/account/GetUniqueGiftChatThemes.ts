import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeChatThemes } from "../../types/account/TypeChatThemes";

export class GetUniqueGiftChatThemes extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3828148681;
    static SUBCLASS_OF_ID = 364989096;
    static className = "account.GetUniqueGiftChatThemes";
    static classType = "request";

    offset!: string;
    limit!: number;
    hash?: bigint;

    constructor(args: { offset?: string, limit?: number, hash?: bigint } = {}) {
        super();
        this.offset = args.offset!;
        this.limit = args.limit!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3828148681, false);
        writer.tgWriteString(this.offset);
        writer.writeInt(this.limit);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeChatThemes {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetUniqueGiftChatThemes {
        const args: any = {};
        const _offset = reader.tgReadString();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetUniqueGiftChatThemes(args);
    }
}