import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAccountDaysTTL } from "../../types/TypeAccountDaysTTL";

export class SetAccountTTL extends MTProtoRequest {
    static CONSTRUCTOR_ID = 608323678;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.SetAccountTTL";
    static classType = "request";

    ttl!: TypeAccountDaysTTL;

    constructor(args: { ttl?: TypeAccountDaysTTL } = {}) {
        super();
        this.ttl = args.ttl!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(608323678, false);
        writer.write(this.ttl.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetAccountTTL {
        const args: any = {};
        const _ttl = reader.tgReadObject();
        args.ttl = _ttl;
        return new SetAccountTTL(args);
    }
}