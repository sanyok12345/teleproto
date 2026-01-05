import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAppConfig } from "../../types/help/TypeAppConfig";

export class GetAppConfig extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1642330196;
    static SUBCLASS_OF_ID = 339221658;
    static className = "help.GetAppConfig";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1642330196, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAppConfig {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetAppConfig {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetAppConfig(args);
    }
}