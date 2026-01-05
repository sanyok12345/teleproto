import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeEmailVerifyPurpose } from "../../types/TypeEmailVerifyPurpose";
import { TypeEmailVerification } from "../../types/TypeEmailVerification";
import { TypeEmailVerified } from "../../types/account/TypeEmailVerified";

export class VerifyEmail extends MTProtoRequest {
    static CONSTRUCTOR_ID = 53322959;
    static SUBCLASS_OF_ID = 1686319496;
    static className = "account.VerifyEmail";
    static classType = "request";

    purpose!: TypeEmailVerifyPurpose;
    verification!: TypeEmailVerification;

    constructor(args: { purpose?: TypeEmailVerifyPurpose, verification?: TypeEmailVerification } = {}) {
        super();
        this.purpose = args.purpose!;
        this.verification = args.verification!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(53322959, false);
        writer.write(this.purpose.getBytes());
        writer.write(this.verification.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeEmailVerified {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): VerifyEmail {
        const args: any = {};
        const _purpose = reader.tgReadObject();
        args.purpose = _purpose;
        const _verification = reader.tgReadObject();
        args.verification = _verification;
        return new VerifyEmail(args);
    }
}