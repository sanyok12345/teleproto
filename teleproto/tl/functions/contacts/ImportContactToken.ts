import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeUser } from "../../types/TypeUser";

export class ImportContactToken extends MTProtoRequest {
    static CONSTRUCTOR_ID = 318789512;
    static SUBCLASS_OF_ID = 765557111;
    static className = "contacts.ImportContactToken";
    static classType = "request";

    token!: string;

    constructor(args: { token?: string } = {}) {
        super();
        this.token = args.token!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(318789512, false);
        writer.tgWriteString(this.token);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeUser {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): ImportContactToken {
        const args: any = {};
        const _token = reader.tgReadString();
        args.token = _token;
        return new ImportContactToken(args);
    }
}