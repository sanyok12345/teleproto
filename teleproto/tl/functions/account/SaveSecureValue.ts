import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputSecureValue } from "../../types/TypeInputSecureValue";
import { TypeSecureValue } from "../../types/TypeSecureValue";

export class SaveSecureValue extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2308956957;
    static SUBCLASS_OF_ID = 85014702;
    static className = "account.SaveSecureValue";
    static classType = "request";

    value!: TypeInputSecureValue;
    secureSecretId!: bigint;

    constructor(args: { value?: TypeInputSecureValue, secureSecretId?: bigint } = {}) {
        super();
        this.value = args.value!;
        this.secureSecretId = args.secureSecretId!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2308956957, false);
        writer.write(this.value.getBytes());
        writer.writeLargeInt(this.secureSecretId, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSecureValue {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SaveSecureValue {
        const args: any = {};
        const _value = reader.tgReadObject();
        args.value = _value;
        const _secureSecretId = reader.readLargeInt(64);
        args.secureSecretId = _secureSecretId;
        return new SaveSecureValue(args);
    }
}