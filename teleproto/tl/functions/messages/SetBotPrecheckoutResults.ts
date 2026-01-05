import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SetBotPrecheckoutResults extends MTProtoRequest {
    static CONSTRUCTOR_ID = 163765653;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "messages.SetBotPrecheckoutResults";
    static classType = "request";

    flags?: number;
    success?: boolean;
    queryId?: bigint;
    error?: string;

    constructor(args: { flags?: number, success?: boolean, queryId?: bigint, error?: string } = {}) {
        super();
        this.flags = args.flags;
        this.success = args.success;
        this.queryId = args.queryId;
        this.error = args.error;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(163765653, false);
        let flags = 0;
        if (this.success) { flags |= 1 << 1; }
        if (this.error !== undefined && this.error !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        if (this.success !== undefined && this.success !== null) {
        }
        writer.writeLargeInt(this.queryId!, 64);
        if (this.error !== undefined && this.error !== null) {
            writer.tgWriteString(this.error);
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetBotPrecheckoutResults {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        if (args.flags & (1 << 1)) {
            const _success = true;
            args.success = _success;
        } else {
            args.success = false;
        }
        const _queryId = reader.readLargeInt(64);
        args.queryId = _queryId;
        if (args.flags & (1 << 0)) {
            const _error = reader.tgReadString();
            args.error = _error;
        } else {
            args.error = undefined;
        }
        return new SetBotPrecheckoutResults(args);
    }
}