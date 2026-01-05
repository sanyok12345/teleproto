import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypePasswordSettings } from "../../types/account/TypePasswordSettings";

export class GetPasswordSettings extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2631199481;
    static SUBCLASS_OF_ID = 3527389304;
    static className = "account.GetPasswordSettings";
    static classType = "request";

    password!: TypeInputCheckPasswordSRP;

    constructor(args: { password?: TypeInputCheckPasswordSRP } = {}) {
        super();
        this.password = args.password!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2631199481, false);
        writer.write(this.password.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePasswordSettings {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPasswordSettings {
        const args: any = {};
        const _password = reader.tgReadObject();
        args.password = _password;
        return new GetPasswordSettings(args);
    }
}