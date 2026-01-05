import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePasswordInputSettings } from "../../types/account/TypePasswordInputSettings";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class RecoverPassword extends MTProtoRequest {
    static CONSTRUCTOR_ID = 923364464;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.RecoverPassword";
    static classType = "request";

    flags?: number;
    code!: string;
    newSettings?: TypePasswordInputSettings;

    constructor(args: { flags?: number, code?: string, newSettings?: TypePasswordInputSettings } = {}) {
        super();
        this.flags = args.flags;
        this.code = args.code!;
        this.newSettings = args.newSettings;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(923364464, false);
        let flags = 0;
        if (this.newSettings !== undefined && this.newSettings !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.code);
        if (this.newSettings !== undefined && this.newSettings !== null) {
            writer.write(this.newSettings.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAuthorization {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): RecoverPassword {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _code = reader.tgReadString();
        args.code = _code;
        if (args.flags & (1 << 0)) {
            const _newSettings = reader.tgReadObject();
            args.newSettings = _newSettings;
        } else {
            args.newSettings = undefined;
        }
        return new RecoverPassword(args);
    }
}