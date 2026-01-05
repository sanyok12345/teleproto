import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class CheckPassword extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3515567382;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.CheckPassword";
    static classType = "request";

    password!: TypeInputCheckPasswordSRP;

    constructor(args: { password?: TypeInputCheckPasswordSRP } = {}) {
        super();
        this.password = args.password!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3515567382, false);
        writer.write(this.password.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckPassword {
        const args: any = {};
        const _password = reader.tgReadObject();
        args.password = _password;
        return new CheckPassword(args);
    }
}