import { BinaryReader } from "../../extensions/BinaryReader";
import { BinaryWriter } from "../../extensions/BinaryWriter";
import { MTProtoRequest } from "../MTProtoRequest";

export class InvokeWithApnsSecret extends MTProtoRequest {
    static CONSTRUCTOR_ID = 229528824;
    static SUBCLASS_OF_ID = 3081909835;
    static className = "InvokeWithApnsSecret";
    static classType = "request";

    nonce!: string;
    secret!: string;
    query?: any;

    constructor(args: { nonce?: string, secret?: string, query?: any } = {}) {
        super();
        this.nonce = args.nonce!;
        this.secret = args.secret!;
        this.query = args.query;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(229528824, false);
        writer.tgWriteString(this.nonce);
        writer.tgWriteString(this.secret);
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

    static fromReader(reader: BinaryReader): InvokeWithApnsSecret {
        const args: any = {};
        const _nonce = reader.tgReadString();
        args.nonce = _nonce;
        const _secret = reader.tgReadString();
        args.secret = _secret;
        const _query = reader.tgReadObject();
        args.query = _query;
        return new InvokeWithApnsSecret(args);
    }
}