import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputPasskeyCredential } from "../../types/TypeInputPasskeyCredential";
import { TypeAuthorization } from "../../types/auth/TypeAuthorization";

export class FinishPasskeyLogin extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2555882759;
    static SUBCLASS_OF_ID = 3118485049;
    static className = "auth.FinishPasskeyLogin";
    static classType = "request";

    flags?: number;
    credential!: TypeInputPasskeyCredential;
    fromDcId?: number;
    fromAuthKeyId?: bigint;

    constructor(args: { flags?: number, credential?: TypeInputPasskeyCredential, fromDcId?: number, fromAuthKeyId?: bigint } = {}) {
        super();
        this.flags = args.flags;
        this.credential = args.credential!;
        this.fromDcId = args.fromDcId;
        this.fromAuthKeyId = args.fromAuthKeyId;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2555882759, false);
        let flags = 0;
        if (this.fromDcId !== undefined && this.fromDcId !== null) { flags |= 1 << 0; }
        if (this.fromAuthKeyId !== undefined && this.fromAuthKeyId !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.write(this.credential.getBytes());
        if (this.fromDcId !== undefined && this.fromDcId !== null) {
            writer.writeInt(this.fromDcId);
        }
        if (this.fromAuthKeyId !== undefined && this.fromAuthKeyId !== null) {
            writer.writeLargeInt(this.fromAuthKeyId, 64);
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

    static fromReader(reader: BinaryReader): FinishPasskeyLogin {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _credential = reader.tgReadObject();
        args.credential = _credential;
        if (args.flags & (1 << 0)) {
            const _fromDcId = reader.readInt();
            args.fromDcId = _fromDcId;
        } else {
            args.fromDcId = undefined;
        }
        if (args.flags & (1 << 0)) {
            const _fromAuthKeyId = reader.readLargeInt(64);
            args.fromAuthKeyId = _fromAuthKeyId;
        } else {
            args.fromAuthKeyId = undefined;
        }
        return new FinishPasskeyLogin(args);
    }
}