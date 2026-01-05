import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeGlobalPrivacySettings } from "../../types/TypeGlobalPrivacySettings";

export class SetGlobalPrivacySettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 517647042;
    static SUBCLASS_OF_ID = 3373160304;
    static className = "account.SetGlobalPrivacySettings";
    static classType = "request";

    settings!: TypeGlobalPrivacySettings;

    constructor(args: { settings?: TypeGlobalPrivacySettings } = {}) {
        super();
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(517647042, false);
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeGlobalPrivacySettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetGlobalPrivacySettings {
        const args: any = {};
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new SetGlobalPrivacySettings(args);
    }
}