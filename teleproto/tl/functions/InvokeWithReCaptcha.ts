import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeWithReCaptcha extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2914717588;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeWithReCaptcha";
    static classType = "request";

    token!: string;
    query?: any;

    constructor(args: { token?: string, query?: any } = {}) {
        super();
        this.token = args.token!;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2914717588, false);
        writer.tgWriteString(this.token);
        writer.write(this.query!.getBytes());
        return writer.getValue();
    }

    readResult(reader: BinaryReader): any {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): InvokeWithReCaptcha {
        const args: any = {};
        const _token = reader.tgReadString();
        args.token = _token;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeWithReCaptcha(args);
    }
}