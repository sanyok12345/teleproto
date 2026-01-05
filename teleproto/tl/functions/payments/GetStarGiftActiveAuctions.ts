import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarGiftActiveAuctions } from "../../types/payments/TypeStarGiftActiveAuctions";

export class GetStarGiftActiveAuctions extends MTProtoRequest {
    static CONSTRUCTOR_ID = 2781892941;
    static SUBCLASS_OF_ID = 2440941767;
    static className = "payments.GetStarGiftActiveAuctions";
    static classType = "request";

    hash?: bigint;

    constructor(args: { hash?: bigint } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(2781892941, false);
        writer.writeLargeInt(this.hash!, 64);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGiftActiveAuctions {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGiftActiveAuctions {
        const args: any = {};
        const _hash = reader.readLargeInt(64);
        args.hash = _hash;
        return new GetStarGiftActiveAuctions(args);
    }
}