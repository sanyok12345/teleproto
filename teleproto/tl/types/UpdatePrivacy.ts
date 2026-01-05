import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { TLObject } from "../../extensions/TLObject";
import { TypePrivacyKey } from "./TypePrivacyKey";
import { TypePrivacyRule } from "./TypePrivacyRule";

export class UpdatePrivacy extends TLObject {
    static CONSTRUCTOR_ID = 3996854058;
    static SUBCLASS_OF_ID = 2676568142;
    static className = "UpdatePrivacy";
    static classType = "constructor";

    key!: TypePrivacyKey;
    rules!: TypePrivacyRule[];

    constructor(args: { key?: TypePrivacyKey, rules?: TypePrivacyRule[] } = {}) {
        super();
        this.key = args.key!;
        this.rules = args.rules!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3996854058, false);
        writer.write(this.key.getBytes());
        writer.writeVector(this.rules, (item) => {
            writer.write(item.getBytes());
        });
        return writer.getValue();
    }

    static fromReader(reader: BinaryReader): UpdatePrivacy {
        const args: any = {};
        const _key = reader.tgReadObject();
        args.key = _key;
        const _rules = reader.readVector((reader) => {
            const item = reader.tgReadObject();
            return item;
        });
        args.rules = _rules;
        return new UpdatePrivacy(args);
    }
}