import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypePasswordInputSettings } from "../../types/account/TypePasswordInputSettings";

export class UpdatePasswordSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2778402863;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.UpdatePasswordSettings";
    static classType = "request";

    password!: TypeInputCheckPasswordSRP;
    newSettings!: TypePasswordInputSettings;

    constructor(args: { password?: TypeInputCheckPasswordSRP, newSettings?: TypePasswordInputSettings } = {}) {
        super();
        this.password = args.password!;
        this.newSettings = args.newSettings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2778402863, false);
        writer.write(this.password.getBytes());
        writer.write(this.newSettings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdatePasswordSettings {
        const args: any = {};
        const _password = reader.tgReadObject();
        args.password = _password;
        const _newSettings = reader.tgReadObject();
        args.newSettings = _newSettings;
        return new UpdatePasswordSettings(args);
    }
}