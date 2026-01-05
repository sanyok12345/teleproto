import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPrivacyKey } from "../../types/TypeInputPrivacyKey";
import { TypePrivacyRules } from "../../types/account/TypePrivacyRules";

export class GetPrivacy extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3671837008;
    static SUBCLASS_OF_ID = 3042622082;
    static className = "account.GetPrivacy";
    static classType = "request";

    key!: TypeInputPrivacyKey;

    constructor(args: { key?: TypeInputPrivacyKey } = {}) {
        super();
        this.key = args.key!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3671837008, false);
        writer.write(this.key.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePrivacyRules {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPrivacy {
        const args: any = {};
        const _key = reader.tgReadObject();
        args.key = _key;
        return new GetPrivacy(args);
    }
}