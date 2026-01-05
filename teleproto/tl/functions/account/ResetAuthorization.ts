import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ResetAuthorization extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3749180348;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ResetAuthorization";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3749180348, false);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ResetAuthorization {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new ResetAuthorization(args);
    }
}