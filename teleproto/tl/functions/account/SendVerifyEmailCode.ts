import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmailVerifyPurpose } from "../../types/TypeEmailVerifyPurpose";
import { TypeSentEmailCode } from "../../types/account/TypeSentEmailCode";

export class SendVerifyEmailCode extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2564831163;
    static SUBCLASS_OF_ID = 1777582190;
    static className = "account.SendVerifyEmailCode";
    static classType = "request";

    purpose!: TypeEmailVerifyPurpose;
    email!: string;

    constructor(args: { purpose?: TypeEmailVerifyPurpose, email?: string } = {}) {
        super();
        this.purpose = args.purpose!;
        this.email = args.email!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2564831163, false);
        writer.write(this.purpose.getBytes());
        writer.tgWriteString(this.email);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeSentEmailCode {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): SendVerifyEmailCode {
        const args: any = {};
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        const _email = reader.tgReadString();
        args.email = _email;
        return new SendVerifyEmailCode(args);
    }
}