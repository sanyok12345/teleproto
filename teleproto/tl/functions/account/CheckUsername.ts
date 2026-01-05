import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class CheckUsername extends MTProtoRequest {
    static CONSTRUCTOR_ID = 655677548;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.CheckUsername";
    static classType = "request";

    username!: string;

    constructor(args: { username?: string } = {}) {
        super();
        this.username = args.username!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(655677548, false);
        writer.tgWriteString(this.username);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckUsername {
        const args: any = {};
        const _username = reader.tgReadString();
        args.username = _username;
        return new CheckUsername(args);
    }
}