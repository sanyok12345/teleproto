import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAuthorization } from "../../types/TypeAuthorization";

export class AcceptLoginToken extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3902057805;
    static SUBCLASS_OF_ID = 3373514778;
    static className = "auth.AcceptLoginToken";
    static classType = "request";

    token!: Buffer;

    constructor(args: { token?: Buffer } = {}) {
        super();
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3902057805, false);
        writer.tgWriteBytes(this.token);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): AcceptLoginToken {
        const args: any = {};
        const _token = reader.tgReadBytes();
        args.token = _token;
        return new AcceptLoginToken(args);
    }
}