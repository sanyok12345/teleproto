import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { EntityLike } from "../../types/../../define";
import { TypeStarGiftCollections } from "../../types/payments/TypeStarGiftCollections";

export class GetStarGiftCollections extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2551943645;
    static SUBCLASS_OF_ID = 4028047852;
    static className = "payments.GetStarGiftCollections";
    static classType = "request";

    peer?: EntityLike;
    hash?: bigint;

    constructor(args: { peer?: EntityLike, hash?: bigint } = {}) {
        super();
        this.peer = args.peer;
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2551943645, false);
        writer.write((this.peer! as any).getBytes());
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftCollections {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGiftCollections {
        const args: any = {};
        const _peer = reader.tgReadObject();
        args.peer = _peer;
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetStarGiftCollections(args);
    }
}