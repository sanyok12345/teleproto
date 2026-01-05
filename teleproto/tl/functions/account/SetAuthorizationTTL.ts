import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class SetAuthorizationTTL extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3213466272;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SetAuthorizationTTL";
    static classType = "request";

    authorizationTtlDays!: number;

    constructor(args: { authorizationTtlDays?: number } = {}) {
        super();
        this.authorizationTtlDays = args.authorizationTtlDays!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3213466272, false);
        writer.writeInt(this.authorizationTtlDays);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetAuthorizationTTL {
        const args: any = {};
        const _authorizationTtlDays = reader.readInt();
        args.authorizationTtlDays = _authorizationTtlDays;
        return new SetAuthorizationTTL(args);
    }
}