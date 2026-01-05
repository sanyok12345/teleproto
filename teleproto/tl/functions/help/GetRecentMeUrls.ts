import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeRecentMeUrls } from "../../types/help/TypeRecentMeUrls";

export class GetRecentMeUrls extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1036054804;
    static SUBCLASS_OF_ID = 4067017847;
    static className = "help.GetRecentMeUrls";
    static classType = "request";

    referer!: string;

    constructor(args: { referer?: string } = {}) {
        super();
        this.referer = args.referer!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1036054804, false);
        writer.tgWriteString(this.referer);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeRecentMeUrls {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetRecentMeUrls {
        const args: any = {};
        const _referer = reader.tgReadString();
        args.referer = _referer;
        return new GetRecentMeUrls(args);
    }
}