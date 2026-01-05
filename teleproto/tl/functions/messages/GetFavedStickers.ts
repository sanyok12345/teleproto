import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeFavedStickers } from "../../types/messages/TypeFavedStickers";

export class GetFavedStickers extends MTProtoRequest {
    static CONSTRUCTOR_ID = 82946729;
    static SUBCLASS_OF_ID = 2389929913;
    static className = "messages.GetFavedStickers";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(82946729, false);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeFavedStickers {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetFavedStickers {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetFavedStickers(args);
    }
}