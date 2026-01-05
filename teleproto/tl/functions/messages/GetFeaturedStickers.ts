import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFeaturedStickers } from "../../types/messages/TypeFeaturedStickers";

export class GetFeaturedStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 1685588756;
    static SUBCLASS_OF_ID = 638891810;
    static className = "messages.GetFeaturedStickers";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(1685588756, false);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFeaturedStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFeaturedStickers {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetFeaturedStickers(args);
    }
}