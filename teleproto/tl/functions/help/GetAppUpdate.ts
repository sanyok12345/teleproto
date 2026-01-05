import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAppUpdate } from "../../types/help/TypeAppUpdate";

export class GetAppUpdate extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1378703997;
    static SUBCLASS_OF_ID = 1486292638;
    static className = "help.GetAppUpdate";
    static classType = "request";

    source!: string;

    constructor(args: { source?: string } = {}) {
        super();
        this.source = args.source!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1378703997, false);
        writer.tgWriteString(this.source);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAppUpdate {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAppUpdate {
        const args: any = {};
        const _source = reader.tgReadString();
        args.source = _source;
        return new GetAppUpdate(args);
    }
}