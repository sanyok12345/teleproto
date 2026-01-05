import { BinaryReader } from "../../../extensions/BinaryReader";
import { BinaryWriter } from "../../../extensions/BinaryWriter";
import { MTProtoRequest } from "../../MTProtoRequest";
import { TypeStarGifts } from "../../types/payments/TypeStarGifts";

export class GetStarGifts extends MTProtoRequest {
    static CONSTRUCTOR_ID = 3293984144;
    static SUBCLASS_OF_ID = 1635309988;
    static className = "payments.GetStarGifts";
    static classType = "request";

    hash?: number;

    constructor(args: { hash?: number } = {}) {
        super();
        this.hash = args.hash;
    }

    getBytes(): Buffer {
        const writer = new BinaryWriter(Buffer.alloc(0));
        writer.writeInt(3293984144, false);
        writer.writeInt(this.hash!);
        return writer.getValue();
    }

    readResult(reader: BinaryReader): TypeStarGifts {
        const result = reader.tgReadObject();
        return result;
    }

    async resolve(client: any, utils: any): Promise<void> {
        // TODO: Implement resolve
    }

    static fromReader(reader: BinaryReader): GetStarGifts {
        const args: any = {};
        const _hash = reader.readInt();
        args.hash = _hash;
        return new GetStarGifts(args);
    }
}