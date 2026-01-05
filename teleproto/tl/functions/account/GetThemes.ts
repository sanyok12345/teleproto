import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeThemes } from "../../types/account/TypeThemes";

export class GetThemes extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1913054296;
    static SUBCLASS_OF_ID = 2143625732;
    static className = "account.GetThemes";
    static classType = "request";

    format!: string;
    hash?: bigint;

    constructor(args: { format?: string, hash?: bigint } = {}) {
        super();
        this.format = args.format!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1913054296, false);
        writer.tgWriteString(this.format);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeThemes {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetThemes {
        const args: any = {};
        const _format = reader.tgReadString();
        args.format = _format;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetThemes(args);
    }
}