import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class ResetWebAuthorization extends MTProtoRequest {
    static CONSTRUCTOR_ID = 755087855;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.ResetWebAuthorization";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(755087855, false);
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

    static fromReader(reader: BinaryReader): ResetWebAuthorization {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new ResetWebAuthorization(args);
    }
}