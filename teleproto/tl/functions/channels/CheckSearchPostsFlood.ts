import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeSearchPostsFlood } from "../../types/TypeSearchPostsFlood";

export class CheckSearchPostsFlood extends MTProtoRequest {
    static CONSTRUCTOR_ID = 576090389;
    static SUBCLASS_OF_ID = 3267415233;
    static className = "channels.CheckSearchPostsFlood";
    static classType = "request";

    flags?: number;
    query?: string;

    constructor(args: { flags?: number, query?: string } = {}) {
        super();
        this.flags = args.flags;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(576090389, false);
        let flags = 0;
        if (this.query !== undefined && this.query !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.query !== undefined && this.query !== null) {
            writer.tgWriteString(this.query);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSearchPostsFlood {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckSearchPostsFlood {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 0)) {
            const _query = reader.tgReadString();
            args.query = _query;
        } else {
            args.query = undefined;
        }
        return new CheckSearchPostsFlood(args);
    }
}