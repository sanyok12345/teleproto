import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeWebPage } from "../../types/messages/TypeWebPage";

export class GetWebPage extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2375455395;
    static SUBCLASS_OF_ID = 754495828;
    static className = "messages.GetWebPage";
    static classType = "request";

    url!: string;
    hash?: number;

    constructor(args: { url?: string, hash?: number } = {}) {
        super();
        this.url = args.url!;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2375455395, false);
        writer.tgWriteString(this.url);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeWebPage {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetWebPage {
        const args: any = {};
        const _url = reader.tgReadString();
        args.url = _url;
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetWebPage(args);
    }
}