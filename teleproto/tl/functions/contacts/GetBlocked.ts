import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeBlocked } from "../../types/contacts/TypeBlocked";

export class GetBlocked extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2592509824;
    static SUBCLASS_OF_ID = 4290400079;
    static className = "contacts.GetBlocked";
    static classType = "request";

    flags?: number;
    myStoriesFrom?: boolean;
    offset!: number;
    limit!: number;

    constructor(args: { flags?: number, myStoriesFrom?: boolean, offset?: number, limit?: number } = {}) {
        super();
        this.flags = args.flags;
        this.myStoriesFrom = args.myStoriesFrom;
        this.offset = args.offset!;
        this.limit = args.limit!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2592509824, false);
        let flags = 0;
        if (this.myStoriesFrom) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.myStoriesFrom !== undefined && this.myStoriesFrom !== null) {
        }
        writer.writeInt(this.offset);
        writer.writeInt(this.limit);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeBlocked {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetBlocked {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _myStoriesFrom = true;
            args.myStoriesFrom = _myStoriesFrom;
        } else {
            args.myStoriesFrom = false;
        }
        const _offset = reader.readInt();
        args.offset = _offset;
        const _limit = reader.readInt();
        args.limit = _limit;
        return new GetBlocked(args);
    }
}