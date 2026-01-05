import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStatsGraph } from "../../types/TypeStatsGraph";

export class LoadAsyncGraph extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1646092192;
    static SUBCLASS_OF_ID = 2609918291;
    static className = "stats.LoadAsyncGraph";
    static classType = "request";

    flags?: number;
    token!: string;
    x?: bigint;

    constructor(args: { flags?: number, token?: string, x?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.token = args.token!;
        this.x = args.x;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1646092192, false);
        let flags = 0;
        if (this.x !== undefined && this.x !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.token);
        if (this.x !== undefined && this.x !== null) {
            writer.writeLargeInt(this.x, 64);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStatsGraph {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): LoadAsyncGraph {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _token = reader.tgReadString();
        args.token = _token;
        if (args.flags & (1 << 0)) {
            const _x = reader.readLargeInt(64);
            args.x = _x;
        } else {
            args.x = undefined;
        }
        return new LoadAsyncGraph(args);
    }
}