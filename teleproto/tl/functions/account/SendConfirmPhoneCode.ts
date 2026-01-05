import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeCodeSettings } from "../../types/TypeCodeSettings";
import { TypeSentCode } from "../../types/auth/TypeSentCode";

export class SendConfirmPhoneCode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 457157256;
    static SUBCLASS_OF_ID = 1827172481;
    static className = "account.SendConfirmPhoneCode";
    static classType = "request";

    hash?: string;
    settings!: TypeCodeSettings;

    constructor(args: { hash?: string, settings?: TypeCodeSettings } = {}) {
        super();
        this.hash = args.hash;
        this.settings = args.settings!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(457157256, false);
        writer.tgWriteString(this.hash!);
        writer.write(this.settings.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSentCode {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendConfirmPhoneCode {
        const args: any = {};
        const _hash = reader.tgReadString();
        args.hash = _hash;
        const _settings = reader.tgReadObject();
        args.settings = _settings;
        return new SendConfirmPhoneCode(args);
    }
}