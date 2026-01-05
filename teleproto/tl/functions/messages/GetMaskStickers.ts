import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeAllStickers } from "../../types/messages/TypeAllStickers";

export class GetMaskStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1678738104;
    static SUBCLASS_OF_ID = 1166231593;
    static className = "messages.GetMaskStickers";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1678738104, false);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeAllStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetMaskStickers {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetMaskStickers(args);
    }
}