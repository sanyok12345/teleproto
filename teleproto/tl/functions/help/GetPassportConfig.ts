import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypePassportConfig } from "../../types/help/TypePassportConfig";

export class GetPassportConfig extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3328290056;
    static SUBCLASS_OF_ID = 3328622765;
    static className = "help.GetPassportConfig";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3328290056, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypePassportConfig {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetPassportConfig {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetPassportConfig(args);
    }
}