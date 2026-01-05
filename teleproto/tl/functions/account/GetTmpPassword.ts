import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";
import { TypeTmpPassword } from "../../types/account/TypeTmpPassword";

export class GetTmpPassword extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1151208273;
    static SUBCLASS_OF_ID = 2959382829;
    static className = "account.GetTmpPassword";
    static classType = "request";

    password!: TypeInputCheckPasswordSRP;
    period!: number;

    constructor(args: { password?: TypeInputCheckPasswordSRP, period?: number } = {}) {
        super();
        this.password = args.password!;
        this.period = args.period!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1151208273, false);
        writer.write(this.password.getBytes());
        writer.writeInt(this.period);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeTmpPassword {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetTmpPassword {
        const args: any = {};
        const _password = reader.tgReadObject();
        args.password = _password;
        const _period = reader.readInt();
        args.period = _period;
        return new GetTmpPassword(args);
    }
}