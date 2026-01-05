import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPrivacyKey } from "../../types/TypeInputPrivacyKey";
import { TypeInputPrivacyRule } from "../../types/TypeInputPrivacyRule";
import { TypePrivacyRules } from "../../types/account/TypePrivacyRules";

export class SetPrivacy extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3388480744;
    static SUBCLASS_OF_ID = 3042622082;
    static className = "account.SetPrivacy";
    static classType = "request";

    key!: TypeInputPrivacyKey;
    rules!: TypeInputPrivacyRule[];

    constructor(args: { key?: TypeInputPrivacyKey, rules?: TypeInputPrivacyRule[] } = {}) {
        super();
        this.key = args.key!;
        this.rules = args.rules!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3388480744, false);
        writer.write(this.key.getBytes());
        writer.writeVector(this.rules, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePrivacyRules {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetPrivacy {
        const args: any = {};
        const _key = reader.tgReadObject();
        args.key = _key;
        const _rules = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rules = _rules;
        return new SetPrivacy(args);
    }
}