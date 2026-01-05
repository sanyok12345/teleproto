import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDeepLinkInfo } from "../../types/help/TypeDeepLinkInfo";

export class GetDeepLinkInfo extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1072547679;
    static SUBCLASS_OF_ID = 2555030584;
    static className = "help.GetDeepLinkInfo";
    static classType = "request";

    path!: string;

    constructor(args: { path?: string } = {}) {
        super();
        this.path = args.path!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1072547679, false);
        writer.tgWriteString(this.path);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDeepLinkInfo {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDeepLinkInfo {
        const args: any = {};
        const _path = reader.tgReadString();
        args.path = _path;
        return new GetDeepLinkInfo(args);
    }
}