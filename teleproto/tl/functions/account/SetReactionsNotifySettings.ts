import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeReactionsNotifySettings } from "../../types/TypeReactionsNotifySettings";

export class SetReactionsNotifySettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 829220168;
    static SUBCLASS_OF_ID = 2382301265;
    static className = "account.SetReactionsNotifySettings";
    static classType = "request";

    settings!: TypeReactionsNotifySettings;

    constructor(args: { settings?: TypeReactionsNotifySettings } = {}) {
        super();
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(829220168, false);
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeReactionsNotifySettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SetReactionsNotifySettings {
        const args: any = {};
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new SetReactionsNotifySettings(args);
    }
}