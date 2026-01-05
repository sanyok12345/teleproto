import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";

export class CheckDownloadFileParams extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1342666121;
    static SUBCLASS_OF_ID = 4122188204;
    static className = "bots.CheckDownloadFileParams";
    static classType = "request";

    bot?: EntityLike;
    fileName!: string;
    url!: string;

    constructor(args: { bot?: EntityLike, fileName?: string, url?: string } = {}) {
        super();
        this.bot = args.bot;
        this.fileName = args.fileName!;
        this.url = args.url!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1342666121, false);
        writer.write((this.bot! as any).getBytes());
        writer.tgWriteString(this.fileName);
        writer.tgWriteString(this.url);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): boolean {
        const result = reader.tgReadBool();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): CheckDownloadFileParams {
        const args: any = {};
        const _bot = reader.tgReadObject();
        args.bot = _bot;
        const _fileName = reader.tgReadString();
        args.fileName = _fileName;
        const _url = reader.tgReadString();
        args.url = _url;
        return new CheckDownloadFileParams(args);
    }
}