import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPasskeyCredential } from "../../types/TypeInputPasskeyCredential";
import { TypePasskey } from "../../types/TypePasskey";

export class RegisterPasskey extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1437867990;
    static SUBCLASS_OF_ID = 3476557280;
    static className = "account.RegisterPasskey";
    static classType = "request";

    credential!: TypeInputPasskeyCredential;

    constructor(args: { credential?: TypeInputPasskeyCredential } = {}) {
        super();
        this.credential = args.credential!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1437867990, false);
        writer.write(this.credential.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePasskey {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RegisterPasskey {
        const args: any = {};
        const _credential = reader.tgReadObject();
        args.credential = _credential;
        return new RegisterPasskey(args);
    }
}