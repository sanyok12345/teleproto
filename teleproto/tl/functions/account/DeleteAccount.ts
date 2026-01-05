import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeInputCheckPasswordSRP } from "../../types/TypeInputCheckPasswordSRP";

export class DeleteAccount extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2730545012;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.DeleteAccount";
    static classType = "request";

    flags?: number;
    reason!: string;
    password?: TypeInputCheckPasswordSRP;

    constructor(args: { flags?: number, reason?: string, password?: TypeInputCheckPasswordSRP } = {}) {
        super();
        this.flags = args.flags;
        this.reason = args.reason!;
        this.password = args.password;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2730545012, false);
        let flags = 0;
        if (this.password !== undefined && this.password !== null) { flags |= 1 << 0; }
        writer.writeInt(flags, false);
        writer.tgWriteString(this.reason);
        if (this.password !== undefined && this.password !== null) {
            writer.write(this.password.getBytes());
        }
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeleteAccount {
        const args: any = {};
        const _flags = reader.readInt();
        args.flags = _flags;
        const _reason = reader.tgReadString();
        args.reason = _reason;
        if (args.flags & (1 << 0)) {
            const _password = reader.tgReadObject();
            args.password = _password;
        } else {
            args.password = undefined;
        }
        return new DeleteAccount(args);
    }
}