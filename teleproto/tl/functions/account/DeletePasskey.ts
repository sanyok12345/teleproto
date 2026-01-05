import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";

export class DeletePasskey extends MTProtoRequest {
    static CONSTRUCTOR_ID = 4122302015;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "account.DeletePasskey";
    static classType = "request";

    id?: string;

    constructor(args: { id?: string } = {}) {
        super();
        this.id = args.id;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(4122302015, false);
        writer.tgWriteString(this.id!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): DeletePasskey {
        const args: any = {};
        const _id = reader.tgReadString();
        args.id = _id;
        return new DeletePasskey(args);
    }
}