import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUser } from "../../types/TypeUser";

export class UpdateUsername extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1040964988;
    static SUBCLASS_OF_ID = 765557111;
    static className = "account.UpdateUsername";
    static classType = "request";

    username!: string;

    constructor(args: { username?: string } = {}) {
        super();
        this.username = args.username!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1040964988, false);
        writer.tgWriteString(this.username);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUser {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): UpdateUsername {
        const args: any = {};
        const _username = reader.tgReadString();
        args.username = _username;
        return new UpdateUsername(args);
    }
}