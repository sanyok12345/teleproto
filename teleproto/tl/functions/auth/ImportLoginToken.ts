import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeLoginToken } from "../../types/auth/TypeLoginToken";

export class ImportLoginToken extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2511101156;
    static SUBCLASS_OF_ID = 1800795702;
    static className = "auth.ImportLoginToken";
    static classType = "request";

    token!: Buffer;

    constructor(args: { token?: Buffer } = {}) {
        super();
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2511101156, false);
        writer.tgWriteBytes(this.token);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeLoginToken {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ImportLoginToken {
        const args: any = {};
        const _token = reader.tgReadBytes();
        args.token = _token;
        return new ImportLoginToken(args);
    }
}