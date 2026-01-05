import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeDhConfig } from "../../types/messages/TypeDhConfig";

export class GetDhConfig extends MTProtoRequest {
    static CONSTRUCTOR_ID = 651135312;
    static SUBCLASS_OF_ID = 3834178955;
    static className = "messages.GetDhConfig";
    static classType = "request";

    version!: number;
    randomLength!: number;

    constructor(args: { version?: number, randomLength?: number } = {}) {
        super();
        this.version = args.version!;
        this.randomLength = args.randomLength!;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(651135312, false);
        writer.writeInt(this.version);
        writer.writeInt(this.randomLength);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeDhConfig {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetDhConfig {
        const args: any = {};
        const _version = reader.readInt();
        args.version = _version;
        const _randomLength = reader.readInt();
        args.randomLength = _randomLength;
        return new GetDhConfig(args);
    }
}