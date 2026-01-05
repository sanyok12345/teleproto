import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class CheckRecoveryPassword extends MTProtoRequest {
    static CONSTRUCTOR_ID = 221691769;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "auth.CheckRecoveryPassword";
    static classType = "request";

    code!: string;

    constructor(args: { code?: string } = {}) {
        super();
        this.code = args.code!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(221691769, false);
        writer.tgWriteString(this.code);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckRecoveryPassword {
        const args: any = {};
        const _code = reader.tgReadString();
        args.code = _code;
        return new CheckRecoveryPassword(args);
    }
}