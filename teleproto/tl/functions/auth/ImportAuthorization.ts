import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class ImportAuthorization extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2776268205;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.ImportAuthorization";
    static classType = "request";

    id?: bigint;
    bytes!: Buffer;

    constructor(args: { id?: bigint, bytes?: Buffer } = {}) {
        super();
        this.id = args.id;
        this.bytes = args.bytes!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2776268205, false);
        writer.writeLargeInt(this.id!, 64);
        writer.tgWriteBytes(this.bytes);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ImportAuthorization {
        const args: any = {};
        const _id = reader.readLargeInt(64);
        args.id = _id;
        const _bytes = reader.tgReadBytes();
        args.bytes = _bytes;
        return new ImportAuthorization(args);
    }
}